import React from 'react'
import SignUp from './SignUp'
import Login from './Login'
import { Route, Routes } from 'react-router-dom'
import './App.css'
const App = () => {
  return (
    <div>
   

      <Routes>
        <Route   path='/' element={<SignUp/>}/>
        <Route   path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App 