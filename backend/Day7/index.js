let express= require('express')
let mongoose=     require('mongoose')
let User=    require('./user')
let bcrypt=    require('bcrypt')
let jwt=    require('jsonwebtoken')
const crypto = require('crypto');
let {sendEmail} = require('./sendEmail')
const cors = require('cors');
mongoose.connect("mongodb://127.0.0.1:27017/5thSem").
then(()=>{
  console.log("db....");
})
let app=     express()
app.use(express.json())
app.use(cors());

app.use(express.json());

// Create account
app.post('/create', async (req, res) => {
  try {
    let { userName, email, passWord , role} = req.body
    console.log(userName, email, "Creating user...");

    // Check if user already exists
    let user = await User.findOne({ email })
    console.log(user, "Existing user check");

    if (user) {
      return res.status(400).json({ 
        success: false, 
        message: "User already exists" 
      })
    }

    // Hash password
    let updatedP = await bcrypt.hash(passWord, 10)
    console.log("Password hashed");

    // Create new user
    let userData = new User({
      userName,
      email,
      passWord: updatedP,
      role:role||'user'
    })

    await userData.save()
    
    return res.status(201).json({ 
      success: true, 
      message: "Account created successfully" 
    })

  } catch (error) {
    console.error("Error in /create:", error)
    return res.status(500).json({ 
      success: false, 
      message: "Server error. Please try again." 
    })
  }
})


// Login
app.post("/login", async (req, res) => {
  try {
    let { email, passWord } = req.body

    // Check if user exists
    let userInfo = await User.findOne({ email })
    console.log(userInfo, "User found");

    if (!userInfo) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      })
    }

    // Verify password
    let validPass = await bcrypt.compare(passWord, userInfo.passWord)
    
    if (validPass) {
        let token = jwt.sign({  email: userInfo.email, role: userInfo.role }, "JHBFIUWBFIUWB");
        console.log(token,"tokennnnn");
      return res.status(200).json({ 
        success: true, 
        message: "Login successful",
        user: {
          userName: userInfo.userName,
          email: userInfo.email,
          role: userInfo.role
        }
      })
    } else {
      return res.status(401).json({ 
        success: false, 
        message: "Incorrect password" 
      })
    }

  } catch (error) {
    console.error("Error in /login:", error)
    return res.status(500).json({ 
      success: false, 
      message: "Server error. Please try again." 
    })
  }
})

app.post('/forgot-password',async(req,res)=>{
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send('User Not Found');
        }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; 
    await user.save();


    // const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    resetUrl = `http://localhost:5173/reset/${resetToken}`;
    await sendEmail(
      user.email,
      'Password Reset Request',
      `Click the link below to reset your password:\n\n${resetUrl}`
    );
     res.status(200).send('Password reset email sent');

    } catch (error) {
    res.status(500).send('Error sending password reset email: ' + error.message);
    }
})


// Reset Password
app.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, 
    });

    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.passWord = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).send('Password reset successfully');
  } catch (error) {
    res.status(500).send('Error resetting password: ' + error.message);
  }
});

app.listen(3000,()=>{
   console.log("server running on port no 3000");
   
  }) 
