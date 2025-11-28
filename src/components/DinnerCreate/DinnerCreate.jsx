import { useState, useContext } from 'react'
import './DinnerCreate.css'
import { dinnerCreate } from '../../services/dinners'
import { useNavigate, Navigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'


const DinnerCreate = () => {
  // Context
  const { user } = useContext(UserContext)

  // State
  const [formData, setFormData] = useState({
    theme: "",
    starter: "",
    main: "",
    dessert: "",
    drink: "",
    date: "",
    guests: [],
  })
  const [errorData, setErrorData] = useState({})
  const [guestInput, setGuestInput] = useState("")

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Consume the service function (API)
      const { data } = await dinnerCreate(formData)
      console.log(formData.guests)
      navigate(`/dinners/${data._id}`)
    } catch (error) {
      console.log(error)
      if (error.response.status === 500) {
        return setErrorData({ message: 'Something went wrong. Please try again.' })
      }
      setErrorData(error.response.data)
    }
  }

  const handleAddGuest = () => {
    if (!guestInput) return;
    setFormData({...formData, guests: [...formData.guests, guestInput]})
    setGuestInput("")
  }


  if (!user) {
    return <Navigate to="/sign-in" />
  }

  return (
    <>
      <h1>Host a dinner</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label hidden htmlFor="theme">Theme</label>
          <input type="text" name="theme" id="theme" placeholder='Theme' required value={formData.theme} onChange={handleChange} />
        </div>

        <div className="form-control">
          <label hidden htmlFor="starter">Starter</label>
          <input type="text" name="starter" id="starter" placeholder='Starter' required value={formData.starter} onChange={handleChange} />
        </div>

        <div className="form-control">
          <label hidden htmlFor="Main">Main</label>
          <input type="text" name="main" id="main" placeholder='Main' required value={formData.main} onChange={handleChange} />
        </div>

        <div className="form-control">
          <label hidden htmlFor="dessert">Dessert</label>
          <input type="text" name="dessert" id="dessert" placeholder='Dessert' required value={formData.dessert} onChange={handleChange} />
        </div>

        <div className="form-control">
          <label hidden htmlFor="drink">Drink</label>
          <input type="text" name="drink" id="drink" placeholder='Drink' required value={formData.drink} onChange={handleChange} />
        </div>

        <div className="form-control">
          <label hidden htmlFor="date">Date</label>
          <input type="date" name="date" id="date" placeholder='Date' required value={formData.date} onChange={handleChange} />
        </div>

        <h2>Guests</h2>
        <div className="attending-guests">
          {formData.guests.length > 0 
          ? formData.guests.map((guest, index) => <span key={index}>{guest}</span>)
          : <p>No guests attending so far</p>
        }
        </div>


        <div className="form-control">
          <label hidden htmlFor="guests">Add a guest</label>
          <input type="text" name="guests" id="guests" placeholder='Add a guest' value={guestInput} onChange={(e) => setGuestInput(e.target.value)} />
          <button id="add-guest" className="action-button" type="button" onClick={handleAddGuest}>Add guest</button>
        </div>




        <button type="submit" className="action-button">Create Dinner</button>

        { errorData.message && <p className='error-message'>{errorData.message}</p>}
      </form>
    </>
  )
}

export default DinnerCreate
