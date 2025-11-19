import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
   
  const [input, setInput] = useState({
    email: "",
    passWord: ""
  });

  function loginFun(e) {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  }

  async function done(e) {
    e.preventDefault();
    
    try {
      console.log("DATA GOING TO BACKEND:", input);

      const res = await axios.post("http://localhost:3000/login", input);

      console.log("SERVER RESPONSE →", res.data);

      if (res.data.success || res.status === 200) {
        alert("Login successful! ✅");
      }

    } catch (error) {
      console.log("ERROR:", error);
      
      if (error.response) {
        alert(`Login failed: ${error.response.data.message || "Invalid credentials"}`);
      } else if (error.request) {
        alert("Network error. Please check your connection.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={done}>
        <input 
          onChange={loginFun} 
          type="email" 
          placeholder='Enter Email' 
          name='email' 
          value={input.email}
          required
        />
        <br />
        <input 
          onChange={loginFun}
          type="password" 
          placeholder='Enter Password'
          name='passWord'
          value={input.passWord}
          required
        />
        <br />
        <br />
        <button type="submit">Login</button>
        <br />
        <Link to="/forgot-password">
          <button type="button">Forgot Password?</button>
        </Link>
        <br />
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Login;