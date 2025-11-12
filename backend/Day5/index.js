let express = require('express')
let app = express()
let cors = require('cors')
let sendOtp = require('./twillioService')
app.use(express.json()) 
app.use(cors())

app.post('/send-otp', async (req, res) => {
    const { phoneNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000)// Generate a 6-digit OTP
    try{
        await sendOtp(phoneNumber, otp);
        res.status(200).send({message: 'OTP sent successfully', otp: otp });
    } catch (error) {
        res.status(500).send({ error: 'Failed to send OTP'});
    }
});   

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})


