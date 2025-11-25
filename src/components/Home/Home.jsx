import "./Home.css"
import Dinner from "../Dinner/Dinner"

const dinners = [
  {
    theme: "Caribean",
    host: "bob3434",
    guests: "steve212",
    date: "30/11/2025"
  },
  {
    theme: "Malaysian",
    host: "steve212",
    guests: "bob3434",
    date: "2/12/2025"
  }

]

  const Home = () => {
    return(
      <>
        <h1>This is home</h1>
        <section>
          {dinners.map((dinner, index) => (
            <Dinner
            key={index}
            dinner={dinner}
            />
          ))}
        </section>
      </>
    )
  }

export default Home 