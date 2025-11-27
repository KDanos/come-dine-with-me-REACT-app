import './App.css'
import { Routes, Route } from 'react-router'
import Home from './components/Home/Home'
import SignInPage from './components/SignInPage/SignInPage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import Navbar from './components/Navbar/Navbar'
import DinnerShowPage from './components/DinnerShowPage/DinnerShowPage'
import DinnerCreate from './components/DinnerCreate/DinnerCreate'
import DinnerUpdateForm from './components/DinnerUpdateForm/DinnerUpdateForm'

const App = () => {


  return (
    <>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/dinners/:dinnerId" element={<DinnerShowPage />} />
          <Route path="/dinners/new" element={<DinnerCreate />} />
          <Route path="/dinners/:dinnerId/edit" element={<DinnerUpdateForm />} />
        </Routes>
      </main>
    </>
  );
};

export default App
