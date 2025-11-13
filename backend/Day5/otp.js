const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: '1m' } }, // Automatically delete OTP after 1 minute
});


const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;