import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const VerifyOTP = () => {
  const [input, setInput] = useState({ otp: '' });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("DATA GOING TO BACKEND:", input);
      const res = await axios.post('http://localhost:3000/verify-otp', input);
      console.log("RESPONSE FROM BACKEND:", res.data);
      alert('OTP verified successfully');
      setInput({ otp: '' });
    } catch (error) {
      console.error("ERROR FROM BACKEND:", error);
      alert('Failed to verify OTP');
    }
  }

  return (
    <div className='VerifyOTP'>
        <h1>Verify OTP</h1>
        <form onSubmit={handleSubmit}>
        <input 
        onChange={handleChange}
        type="text" 
        placeholder='Enter OTP'
        name = 'otp'
        value = {input.otp}
         />
        <br />
        <br />
        <button type="submit">Verify OTP</button>
        <br />
        </form>
    </div>
  )
}

export default VerifyOTP