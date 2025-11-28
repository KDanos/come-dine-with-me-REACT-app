import "./Home.css"
import { useState, useEffect , useContext} from 'react'
import { dinnerIndex } from "../../services/dinners"
import { Link } from 'react-router'
import { UserContext } from "../../contexts/UserContext"



const Home = () => {
  //Static Variables
  const { user: loggedInUser } = useContext(UserContext)

  //State Variables
  const [dinners, setDinners] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await dinnerIndex()
        setDinners(data)
      } catch (error) {
        console.log(error)
        setErrorData(error.response.data)
      }
    }
    getData()
  }, [])

  //Function to identify if user and host are the same
  const isHost = (dinner) => {
    return loggedInUser === dinner.host
  }
  return (
    <>
      <h1>This is home</h1>
      <section>
        {dinners.map(dinner => {
            const cardClassName = `dinner-card${isHost(dinner) ? '-host' : ''}`
            //console.log(`Dinner ${dinner.theme}: className = "${cardClassName}"`)
          return (
            <div key={dinner._id} className={`dinner-card ${isHost(dinner)?'host':''}`}>
              
              <Link to={`/dinners/${dinner._id}`}>
                <h2>Host: {dinner.host.username}</h2>
                <p>{new Date(dinner.date).toLocaleDateString('en-GB')}</p>
                <h3>Theme: {dinner.theme}</h3>
                <p>Starter: {dinner.main}</p>
                <p>Main: {dinner.main}</p>
                <p>Dessert: {dinner.dessert}</p>

                <p className="guests">
                  Guests: {dinner.guests && dinner.guests.length > 0
                    ? dinner.guests.map(guest => guest.username).join(', ')
                    : 'None yet'}
                </p>
              </Link>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default Home 