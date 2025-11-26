import './DinnerShowPage.css'
import { useContext, useEffect, useState} from 'react'
import { UserContext } from '../../contexts/UserContext'
import { dinnerShow } from '../../services/dinners'
import { useParams } from 'react-router'

const DinnerShowPage = () => {
    const [dinner, setDinner] = useState('')
    const { dinnerId } = useParams()
    useEffect(() => {
        const getDinner = async () => {
            try {
                const myDinner = await dinnerShow(dinnerId)
                setDinner(myDinner.data)
            } catch (error) {
                console.error('There has been an error in the useEffect hook when trying to retrieve the dinner object')
            }
        }
        getDinner()
    },[])
    

    const loggedInUser = useContext(UserContext).user
    console.log ('this is what the dinner.host.username looks like: ',dinner.host)
    return (
        <>
            <div id="top-ribbon">
                <h3>dinner.date</h3>
                <h1>{dinner.theme}</h1>
                <h3>Hosted by {dinner?.host?.username}</h3>
            </div>
            <div id="details-box">
                <h2>Starter: {dinner.starter}</h2>
                <h2>Main: {dinner.main}</h2>
                <h2>Desser: {dinner.dessert}</h2>
                <h2>Drinks: {dinner.drink}</h2>
            </div>
            <div id="guest-ribbon">
                <p>Guests: </p>
                <p>Guest 2</p>
                <p>Guest 3</p>
                <p>Guest 4</p>
                <p>Guest 5</p>
            </div>
        </>
    )
}

export default DinnerShowPage