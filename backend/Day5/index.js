let express = require('express')
let app = express()
let cors = require('cors')
let sendOtp = require('./twillioService')
const Otp = require('./otp')
const mongoose = require('mongoose');
app.use(express.json()) 
app.use(cors())

mongoose.connect('mongodb://localhost:27017/otp', {
});


app.post('/send-otp', async (req, res) => {
    const { phoneNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000)// Generate a 6-digit OTP

    // Set expiration time for the OTP (1 minute from now)
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000); // 1 minute

    try{
        await sendOtp(phoneNumber, otp);

         // Save OTP and phone number in the database
    const newOtp = new Otp({
      phoneNumber,
      otp,
      expiresAt:expiresAt.toString(),
    });
    await newOtp.save();

        res.status(200).send({message: 'OTP sent successfully', otp: otp });
    } catch (error) {
        res.status(500).send({ error: 'Failed to send OTP'});
    }
});   

app.post('/verify-otp', async (req, res) => {
    const { otp } = req.body;
    try {
        const record = await Otp.findOne({otp });
        if (!record) {
            return  res.status(400).send({ message: 'Invalid OTP' });
        }
        const currentTime = new Date();
        if (currentTime > record.expiresAt) {
      return res.status(400).send({ error: 'OTP has expired' });
    }
        res.status(200).send({ message: 'OTP verified successfully' });

        await Otp.deleteOne({ _id: record._id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to verify OTP' });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})


