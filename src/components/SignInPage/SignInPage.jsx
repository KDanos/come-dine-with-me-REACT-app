import { signInService } from '../../services/auth'
import './SignInPage.css'
import { useState, useContext } from 'react'
import { getUserFromToken, setToken } from '../../utils/token'

//Context
import { UserContext } from '../../contexts/UserContext'

const SignInPage = () => {
    const { setUser } = useContext(UserContext)

    //State Variables
    const [signInData, setSignInData] = useState({
        username: "",
        password: ""
    })
    const [errorData, setErrorData] = useState({})
    const [successMsg, setSuccessMsg] = useState('')
    
    //Functions
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await signInService(signInData)
            //Retrieve the token from the the response
            const userToken = response.data.token

            //Save the token to local storage
            if (userToken) setToken(userToken)

            //Set the user state with the user found in the token
            const userKD= getUserFromToken()
            setUser(userKD)
            setSuccessMsg(`Welcome back ${userKD.username}`)

        } catch (error) {
            if (error.response){setErrorData(error.response.data)}
            else if (error.request){
                //Request was made but no response was received
                console.error ('No response from server:', error.request)
                setErrorData({general: 'Cannot connect to server'})
            }else {
                //Default response if neither error catchers above work
                console.error ('Error from Konstantin: ', error.message)
                setErrorData ({general: error.message})
            }
            
        }
    }
    const handleChange = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value })
        setErrorData({ ...errorData, [e.target.name]: "",message: "" })
        setSuccessMsg('')
    }
    return (
        <>
            <h1>Let the cooking begin!</h1>
            <form onSubmit={handleSubmit}>
                <div id="form-control">
                    <label htmlFor="username" hidden>Username</label>
                    <input type="text" name="username" placeholder="e.g BigDog" required onChange={handleChange} />
                    {errorData.username && <p className='error-message'>{`blah blah ${errorData.username} something else`}</p>}
                </div>
                <div id="form-control">
                    <label htmlFor="password" hidden>Username</label>
                    <input type="password" name="password" placeholder="password" required onChange={handleChange} />
                </div>

                <button className="action-button">Sign-in</button>
                { errorData.message && <p className='error-message'>{errorData.message}</p>}
                <p className="success-message">{successMsg}</p>
            </form>

        </>
    )
}
export default SignInPage