
import './Navbar.css'
import { Link } from 'react-router'

const Navbar = () => {
    return (

        <div id="navbar">
            <nav id="leftNavbar">
                <Link to='/'>Home</Link>
                <Link to='/'>Host a dinner</Link>

            </nav>
            <nav id="rightNavbar">
                <Link to='sign-in'>Sign-in</Link>
                <Link to='sign-up'>Sign-up</Link>
                <Link to='auth/userid'>User</Link>
                <Link to='sign-out'>Sign-out</Link>
            </nav>
        </div>

    )
}

export default Navbar