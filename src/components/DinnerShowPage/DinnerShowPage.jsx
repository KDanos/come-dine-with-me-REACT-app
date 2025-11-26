import './DinnerShowPage.css'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'

const DinnerShowPage = () => {
    
    const {user} = useContext(UserContext)
    console.log (user)
    return(
    <>
    <h1>This is the dinner show page</h1>
    </>
    )
}

export default DinnerShowPage