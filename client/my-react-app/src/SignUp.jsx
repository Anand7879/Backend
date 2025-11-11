import React from 'react'
import { Link } from 'react-router-dom'

const signUp = () => {
  return (
    <div className='signUp'>
        <h1>SignUp</h1>
        <form action="">
        <input type="text" placeholder='Enter User Name' />
        <br />
        <input type="email" placeholder='Enter Email' />
        <br />
        <input type="password" placeholder='Enter Password' />
        <br />
        <br />
        <button>SignUp</button>
        <br />
        <p>Already have an account? <Link to='/login'>Login</Link></p>
        </form>
    </div>
  )
}

export default signUp