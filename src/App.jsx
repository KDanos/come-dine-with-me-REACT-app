import './App.css'
import { Routes, Route } from 'react-router'
import Home from './components/Home/Home'
import SignInPage from './components/SignInPage/SignInPage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import Navbar from './components/Navbar/Navbar'
import DinnerShowPage from './components/DinnerShowPage/DinnerShowPage'
import DinnerCreate from './components/DinnerCreate/DinnerCreate'
// import DinnerUpdate from './components/DinnerUpdate/DinnerUpdate'

const App = () => {


  return (
    <>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          {/* <Route path="/dinners" element={<dinnerIndex />} /> */}
          <Route path="/dinners/:dinnerId" element={<DinnerShowPage />} />
          <Route path="/dinners/new" element={<dinnerCreate />} />
          {/* <Route path="/dinners/:dinnerId/edit" element={<dinnerUpdate />} /> */}
        </Routes>
      </main>
    </>
  );
};

export default App
