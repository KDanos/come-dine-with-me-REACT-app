import "./Home.css"
import Dinner from "../Dinner/Dinner"
import { findAllUsers } from "../../services/auth"
import { useState, useEffect } from 'react'
import { dinnerIndex } from "../../services/dinners"

 



// const dinners = [
//   {
//     theme: "Caribean",
//     host: "bob3434",
//     guests: "steve212",
//     date: "30/11/2025"
//   },
//   {
//     theme: "Malaysian",
//     host: "steve212",
//     guests: "bob3434",
//     date: "2/12/2025"
//   }

// ]

const Home = () => {
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
  
  
  
  
  const [ allUsers, setAllUsers ] = useState([])

  

  // useEffect(() => {
  //   const loadUsers = async () => {
  //     try {
  //       const tempAllUsers = await findAllUsers()
  //       setAllUsers(tempAllUsers.data)
  //     } catch (error) {
  //       console.error('There has been an error in the fetch hook', error)
  //     }
  //   }
  //   loadUsers()
  // }, []
  // )

  return (
    <>
      <h1>This is home</h1>
      <section>
        {dinners.map(dinner => {
          return (
            <div key={dinner._id} className='dinner-card'>
              <Link to={`/dinners/${dinner._id}`}>
                <h2>{dinner.title}</h2>
                <p>{dinner.text.substring(0, 20)}...</p>
              </Link>
            </div>
              )
            })}
      </section>


{/* <section>
  {allUsers.map(person=>(
    <div key={person._id}>
      <p>Username: {person.username}</p>
      <p>Email: {person.email}</p>
    </div>
  ))} 

</section> */}

    </>
  )
}

export default Home 