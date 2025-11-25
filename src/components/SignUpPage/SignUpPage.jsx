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
    //Functions
    const handleChange = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            console.log(
                `Username is ${signUpData.username},
                email is ${signUpData.email}, 
                password is ${signUpData.password} and
                confirmPassword is ${signUpData.confirmPassword}`
            )
            console.log('you would like to sign up')
        } catch (error) {

        }

    }

    return (
        <>
            <h1>Get your cuttlery out</h1>
            <form onSubmit={handleSubmit}>
                <div id="form-control">
                    <label hidden htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Select a username" onChange={handleChange} required />
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
            </form>
        </>
    )
}

export default SignUpPage

