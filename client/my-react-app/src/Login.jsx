import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const login = () => {
   
   const [input, setInput] = useState({
    email: "",
    passWord: ""
  });

   function loginFun(e) {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  }

  async function done() {
    try {
      console.log("DATA GOING TO BACKEND:", input);

      const res = await axios.post("http://localhost:3000/login", input, {
      });

      console.log("SERVER RESPONSE →", res.data);

    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  return (
    <div className='login'>
        <h1>Login</h1>
        <form action="">
        <input onChange={loginFun} type="email" placeholder='Enter Email' name='email' value={input.value} />
        <br />
        <input type="password" placeholder='Enter Password' />
        <br />
        <br />
        <button onClick={done}>Login</button>
        <br />
        <p>Don't have an account? <a href='/'>Sign Up</a></p>
        </form>
    </div>
  )
}

export default login