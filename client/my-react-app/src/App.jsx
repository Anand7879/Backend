import React from 'react'
// import RBACapp from './RBACapp'
// import ResetPassWord from './ResetPassWord'
import SignUp from './SignUp'
import Login from './Login'
import { Route, Routes } from 'react-router-dom'
import Forget from './Forget'
import ResetPassWord from './ResetPassWord'
// import VerifyOTP from './VerifyOTP'
import './App.css'
// import OTPgenetate from './OTPgenetate'
const App = () => {
  return (
    <div>
      {/* <RBACapp/> */}
      {/* <ResetPassWord/> */}
      <Routes>
        <Route   path='/' element={<Login/>}/>
        <Route   path='/signup' element={<SignUp/>}/>
        <Route   path='/forgot-password' element={<Forget/>}/>
        <Route   path='/reset/:token' element={<ResetPassWord/>}/>
        {/* <Route   path='/' element={<OTPgenetate/>}/> */}
        {/* <Route   path='/verify-otp' element={<VerifyOTP/>}/> */}
      </Routes>


    </div>
  )
}

export default App 