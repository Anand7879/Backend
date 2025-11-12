import React, { useState } from 'react';
import axios from 'axios';

const OTPgenetate = () => {

  const [input, setInput] = useState({
    phoneNumber: ""
  });

 const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    });
  };

  async function handleSubmit(e) {
    e.preventDefault()

    try{

      if (input.phoneNumber.trim() === "") {
      alert("Please enter a phone number");
      return;
    }
      console.log("DATA GOING TO BACKEND:", input);
      const res =  await axios.post('http://localhost:3000/send-otp', input);
      console.log("RESPONSE FROM BACKEND:", res.data);
      alert(`OTP sent to ${input.phoneNumber}`);
      setInput({ phoneNumber: "" });

    } catch (error) {
      console.error("ERROR FROM BACKEND:", error);
    }


  }

  return (
    <div className='OTPgenerate'>
        <h1>Generate OTP</h1>
        <form onSubmit={handleSubmit}>
        <input 
        onChange={handleChange}
        type="text" 
        placeholder='Enter your Phone Number'
        name = 'phoneNumber'
        value = {input.phoneNumber}
         />
        <br />
        <br />
        <button type="submit">Generate OTP</button>
        <br />
        </form>
    </div>
  )
}

export default OTPgenetate
