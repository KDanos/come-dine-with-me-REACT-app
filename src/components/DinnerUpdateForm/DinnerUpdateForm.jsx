import { useState, useContext, useEffect } from 'react'
import './DinnerUpdateForm.css'
import { dinnerUpdate, dinnerShow } from '../../services/dinners'
import { useNavigate, Navigate, useParams } from 'react-router'
import { UserContext } from '../../contexts/UserContext'


const DinnerUpdate = () => {
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
  const { dinnerId } = useParams()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Consume the service function (API)
      await dinnerUpdate(dinnerId, formData)
      navigate(`/dinners/${dinnerId}`)
    } catch (error) {
      console.log(error)
      if (error.response.status === 500) {
        return setErrorData({ message: 'Something went wrong. Please try again.' })
      }
      setErrorData(error.response.data)
    }
  }
  console.log(formData.guests)
  const handleAddGuest = () => {
    if (!guestInput) return;
    setFormData({...formData, guests: [...formData.guests, guestInput]})
    setGuestInput("")
  }


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await dinnerShow(dinnerId)
        data.guests = data.guests.map(guest => guest.username)
        data.date = data.date.split("T")[0];
        setFormData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [dinnerId])



  if (!user) {
    return <Navigate to="/sign-in" />
  }

  return (
    <>
      <h1>Update a dinner</h1>
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
          <button type="button" onClick={handleAddGuest}>Add guest</button>
        </div>



        <button type="submit" className="action-button">Update Dinner</button>
        { errorData.message && <p className='error-message'>{errorData.message}</p>}
      </form>
    </>
  )
}

export default DinnerUpdate
