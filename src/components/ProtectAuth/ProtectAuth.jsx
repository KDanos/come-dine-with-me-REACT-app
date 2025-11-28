import './ProtectAuth.css'
import { useContext } from 'react'
import { Navigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'



const ProtectAuth = ({children}) => {
    const { user } = useContext(UserContext)
    
    if (user) {
        return <Navigate to='/'></Navigate>
    }
    return children
}

export default ProtectAuth