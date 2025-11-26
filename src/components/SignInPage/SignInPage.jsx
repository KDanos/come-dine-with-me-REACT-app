import { signInService } from '../../services/auth'
import './SignInPage.css'
import { useState } from 'react'

const SignInPage = () => {
    //State Variables
    const [signInData, setSignInData] = useState({
        username: "",
        password: ""
    })
    const[errorData, setErrorData] = useState({})

    //Functions
    const handleSubmit = (e) => {
        e.preventDefault()     
        try{
        signInService (signInData)
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