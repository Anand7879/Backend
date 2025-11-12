const twilio = require('twilio');

const accountSid = 'AC0c9dfd9ffe4fd89f0033c662aa4bb470' // Your Account SID from www.twilio.com/console
const authToken = '295001846b6cf805b188eae5e922d369' // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

const sendOtp = (phoneNumber, otp) => {
    return client.messages.create({
        body: `Your OTP code is ${otp}`, // Message content
        from: '+18046892857', // Your Twilio number
        to: phoneNumber // Recipient's phone number
    });
};

module.exports = sendOtp;
