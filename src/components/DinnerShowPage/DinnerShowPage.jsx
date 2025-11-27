import './DinnerShowPage.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { dinnerShow, dinnerDelete, dinnerUpdate } from '../../services/dinners'
import { useParams, useNavigate } from 'react-router'
import AllComments from '../AllComments/AllComments'

const DinnerShowPage = () => {
    
    const [dinner, setDinner] = useState('')
    const { dinnerId } = useParams()
    const navigate = useNavigate()
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
    }, [])

    //Get the logged in user
    const loggedInUser = useContext(UserContext).user

    //Determine delete/edit authorisation
    const canDelete = () => {
        if (!dinner.host || !loggedInUser) return false
        const hostId = typeof dinner.host === 'string' ? dinner.host : dinner.host._id
        return hostId === loggedInUser._id
    }

    //Determine comment authorisatoin

    //Event handlers
    const deleteDinner = async () => {
        //Check authorisation
        if (!canDelete()) {
            alert('You can only delete your own dinners!')
            return
        }
        //Double check that the deletion should take place
        const deleteConfirmation = window.confirm('Are you sure you want to delete this dinner? This action cannot be undone! ')
        if (deleteConfirmation) {
            try {
                await dinnerDelete(dinnerId)
                navigate('/') 
            } catch (error) {
                console.log('failed to delete the dinner')
            }

        }
        console.log(`can delete? ${canDelete()}`)
        console.log('you want to delete this dinner')
    }
    const editDinner = () => {
        console.log('you want to edit this dinner')
    }

    return (
        <>
            <div id="buttons-container">
                <button className="action-button" id="edit-button" onClick={editDinner}>Edit</button>
                <button className="action-button" id="delete-button" onClick={deleteDinner}>Delete</button>
            </div>
            <div id="top-ribbon">
                <h3>{dinner.date ?
                    new Date(dinner.date).toLocaleDateString() :
                    'Loading ...'}</h3>
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
            <AllComments
                dinnerId={dinnerId}
                comments={dinner.comments || []} />
        </>
    )
}

export default DinnerShowPage