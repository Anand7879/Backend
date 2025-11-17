//Role Based Access Control (RBAC) Middleware Example
let express= require('express')
let mongoose=     require('mongoose')
let User=    require('./user')
let bcrypt=    require('bcrypt')
let jwt=    require('jsonwebtoken')

mongoose.connect("mongodb://127.0.0.1:27017/5thSem").
  then(()=>{
   console.log("db....");
  })
  let app=     express()
  app.use(express.json())


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

function checkRole(role,role2){
     return (req,res,next)=>{
      let token = req.headers.authorization;
      if (!token) {
         return res.send('Unauthorizeddd User ||');
     }else{
      let deCodedToken = jwt.verify(token,  "JHBFIUWBFIUWB");

      if (role!==deCodedToken.role && role2!==deCodedToken.role) {
         return res.send('Access denieddd ||')
     }
     else {
         next();
     }

     }

   }
 }
  
~
app.get('/public',(req,res)=>{
   res.send("isko koi bhi dekh sakta hai")

  })
  app.get('/private', checkRole('admin','instructor') , (req,res)=>{
   res.send("sirf admin hi dekh sakta hai")

  })
  app.listen(3000,()=>{
   console.log("server running on port no 3000");
   
  })  

