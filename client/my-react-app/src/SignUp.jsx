import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  
  const [input, setInput] = useState({
    userName: "",
    email: "",
    passWord: ""
  });

  function signUpFun(e) {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  }

  async function handleSignUp(e) {
    e.preventDefault(); // Prevent form submission/page reload
    
    try {
      console.log("DATA GOING TO BACKEND:", input);

      const res = await axios.post("http://localhost:3000/create", input);

      console.log("SERVER RESPONSE →", res.data);

      // ✅ SUCCESS ALERT - After successful registration
      if (res.data.success || res.status === 201) {
        alert("Account created successfully! ✅");
        // Clear form
        setInput({
          userName: "",
          email: "",
          passWord: ""
        });
        // Optional: Redirect to login page
        window.location.href = "/login";
      }

    } catch (error) {
      console.log("ERROR:", error);
      
    
      if (error.response) {
       
        alert(`Signup failed: ${error.response.data.message || "Unable to create account"}`);
      } else if (error.request) {
        
        alert("Network error. Please check your connection.");
      } else {
       
        alert("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className='signUp'>
      <h1>SignUp</h1>
      <form onSubmit={handleSignUp}>
        <input 
          onChange={signUpFun}
          type="text" 
          placeholder='Enter User Name'
          name='userName'
          value={input.userName}
          required
        />
        <br />
        <input 
          onChange={signUpFun}
          type="email" 
          placeholder='Enter Email'
          name='email'
          value={input.email}
          required
        />
        <br />
        <input 
          onChange={signUpFun}
          type="password" 
          placeholder='Enter Password'
          name='passWord'
          value={input.passWord}
          // required
          // minLength={6}
        />
        <br />
        <br />
        <button type="submit">SignUp</button>
        <br />
        <p>Already have an account? <Link to='/'>Login</Link></p>
      </form>
    </div>
  );
}

export default SignUp;