
import './Navbar.css'
import { Link , useNavigate} from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'

const Navbar = (loggedInUser) => {
    const { user, signOut } = useContext(UserContext)
    const navigate = useNavigate()
    
    //Functions
    const handleSignOut = ()=>{
        signOut()
        navigate('/')
    }
    return (

        <div id="navbar">
            <nav id="leftNavbar">
                <Link to='/'>Home</Link>
                {user ? (
                    <>
                        <Link to="/dinners/new">Host a dinner</Link>
                    </>
                ) :(<></>)
                }
            </nav>
            <nav id="rightNavbar">
                {user ? (
                    <>
                        <span className="user-name">{user.username}👤</span>
                        <Link to='/' onClick={handleSignOut}>Sign-out</Link>
                    </>
                ) : (
                    <>
                        <Link to='sign-in'>Sign-in</Link>
                        <Link to='sign-up'>Sign-up</Link>
                    </>
                )
                }
            </nav>
        </div>

    )
}
export default Navbar