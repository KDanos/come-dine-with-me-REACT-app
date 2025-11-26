import { signUpService } from '../../services/auth'
import './SignUpPage.css'
import { useState } from 'react'

const SignUpPage = () => {
    //State Variables
    const [signUpData, setSignUpData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errorData, setErrorData] = useState({})
    const [successMsg, setSuccessMsg] = useState('')

    //Functions
    const handleChange = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value })
        setErrorData({ ...errorData, [e.target.name]: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            //Send to the API the sign-up request with its data
            const response = await signUpService(signUpData)
            //On success, return a success message
            setSuccessMsg(`Welcome to the group ${signUpData.username}. Your registration has been successful`)
        } catch (error) {
            setErrorData (error.response.data)
        }

    }

    return (
        <>
            <h1>Get your cuttlery out</h1>
            <form onSubmit={handleSubmit}>
                <div id="form-control">
                    <label hidden htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Select a username" onChange={handleChange} required />
                    {
                        errorData.username &&
                        <p className='error-message'>
                            {`Username ${errorData.username} is already taken. Please select another`}
                        </p>
                    }
                </div>
                <div id="form-control">
                    <label hidden htmlFor="email">Emaill</label>
                    <input type="text" name="email" placeholder="e.g. user@domaina.com" onChange={handleChange} required />
                </div>
                <div id="form-control">
                    <label hidden htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Please chose a password" onChange={handleChange} required />
                </div>
                <div id="form-control">
                    <label hidden htmlFor="confirmPassword">Password</label>
                    <input type="password" name="confirmPassword" placeholder="Please confirm your password" onChange={handleChange} required />
                </div>

                <button type="submit" className='action-button'>Create an account</button>
                <p className="success-message">{successMsg}</p>
            </form>
        </>
    )
}

export default SignUpPage

