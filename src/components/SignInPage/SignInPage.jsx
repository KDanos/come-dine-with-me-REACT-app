import { signInService } from '../../services/auth'
import './SignInPage.css'
import { useState } from 'react'
import { setToken } from '../../utils/token'

const SignInPage = () => {
    //State Variables
    const [signInData, setSignInData] = useState({
        username: "",
        password: ""
    })
    const[errorData, setErrorData] = useState({})

    //Functions
    const handleSubmit = async (e) => {
        e.preventDefault()     
        try{
        const response = await signInService (signInData)
        //Retrieve the token from the the response
        const userToken = response.data.token
        //Save the token to local storage
        if(userToken) setToken (userToken)
        console.log(response)
        console.log('you have succesfully signed in')
        } catch (error) {
            setErrorData(error.response.data)
        }
    }

    const handleChange = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value })
        setErrorData({...errorData, [e.target.name]:""})
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
                    <input type="text" name="password" placeholder="password" required onChange={handleChange} />
                </div>

                <button className="action-button">Sign-in</button>
            </form>

        </>
    )
}
export default SignInPage