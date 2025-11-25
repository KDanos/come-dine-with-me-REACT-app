import "./Dinner.css"

const Dinner = ({dinner}) => {
  return (
    <div className="dinner-card">
      <h2>{dinner.date}</h2>
      <p>Host: {dinner.host}</p>
      <p>Theme: {dinner.theme}</p>
      <p>Guests: {dinner.guests}</p>
    </div>
  )
}

export default Dinner