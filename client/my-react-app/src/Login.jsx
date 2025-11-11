import React, { useState } from 'react';
import axios from 'axios';

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
    e.preventDefault(); // Prevent form submission/page reload
    
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
        // Server responded with error status
        alert(`Login failed: ${error.response.data.message || "Invalid credentials"}`);
      } else if (error.request) {
       
        alert("Network error. Please check your connection.");
      } else {
        // Other errors
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
        <p>Don't have an account? <a href='/'>Sign Up</a></p>
      </form>
    </div>
  );
}

export default Login;




















































// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'

// const login = () => {
   
//    const [input, setInput] = useState({
//     email: "",
//     passWord: ""
//   });

//    function loginFun(e) {
//     const { name, value } = e.target;
//     setInput(prev => ({ ...prev, [name]: value }));
//   }

//   async function done() {
//     try {
//       console.log("DATA GOING TO BACKEND:", input);

//       const res = await axios.post("http://localhost:3000/login", input, {
//       });

//       console.log("SERVER RESPONSE →", res.data);


//     } catch (error) {
//       console.log("ERROR:", error);
//     }

//   }

//   return (
//     <div className='login'>
//         <h1>Login</h1>
//         <form action="">
//         <input onChange={loginFun} type="email" placeholder='Enter Email' name='email' value={input.value} />
//         <br />
//         <input onChange={loginFun} name='passWord'
//           value={input.passWord} type="password" placeholder='Enter Password' />
//         <br />
//         <br />
//         <button onClick={done}>Login</button>
//         <br />
//         <p>Don't have an account? <a href='/'>Sign Up</a></p>
//         </form>
//     </div>
//   )
// }

// export default login