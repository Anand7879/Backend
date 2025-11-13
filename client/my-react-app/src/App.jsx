import React from 'react'
// import SignUp from './SignUp'
// import Login from './Login'
import { Route, Routes } from 'react-router-dom'
import VerifyOTP from './VerifyOTP'
import './App.css'
import OTPgenetate from './OTPgenetate'
const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route   path='/' element={<SignUp/>}/>
        <Route   path='/login' element={<Login/>}/> */}
        <Route   path='/' element={<OTPgenetate/>}/>
        <Route   path='/verify-otp' element={<VerifyOTP/>}/>
      </Routes>


    </div>
  )
}

export default App 