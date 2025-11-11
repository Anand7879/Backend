// Authentication 
// Authorization
// npm i mongoose
// npm i bcrypt
// npm i cors

let express = require('express')
let mongoose = require('mongoose')
let User = require('./user')
let bcrypt = require('bcrypt')
let cors = require('cors')

let app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/5thSem')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err)
  });

app.get('/', (req, res) => {
  res.send("Server is running")
})

// Create account
app.post('/create', async (req, res) => {
  try {
    let { userName, email, passWord } = req.body
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
      passWord: updatedP
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
      return res.status(200).json({ 
        success: true, 
        message: "Login successful",
        user: {
          userName: userInfo.userName,
          email: userInfo.email
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})















































// // Authentication 
// //Autheraization
// // npm i mongoose
// // npm ibcrypt

// let express = require('express')
// let mongoose = require('mongoose')

//   let User=    require('./user')
//    let bcrypt=    require('bcrypt')
//  let cors=   require('cors')

// let app = express()
// app.use(express.json())
// app.use(cors())
// mongoose.connect('mongodb://127.0.0.1:27017/5thSem')
// .then(() => {console.log('Connected to MongoDB')
// });

// app.get('/',(req,res)=>{
//     res.send("hiii")

//  })

//  // create account
//   app.post('/create',  async(req,res)=>{
//           let {userName,email,passWord}=   req.body
//       console.log(userName,email ,"heheh");
      
//      let user=     await  User.findOne({email})
//      console.log(user,"hiiii");
     
//      if(user){
//         res.send("user jinda haiii")
//      }
//          let updatedP=     await  bcrypt.hash(passWord,10)
//          console.log(updatedP,"HEH");
         
//         let userData=   new  User({
//             userName,
//             email,
//             passWord:updatedP
//          })
//               await userData.save()
//               res.send("account ban gya hai....")
//             //   console.log(userName,email, passWord);
            
//  })


//  //login
//  app.post("/login",async(req,res)=>{
//     let {email,passWord}=   req.body


//        let userInfo=    await User.findOne({email})
//        console.log(userInfo,"kyaa milegaaaaaaaa");
       
//        if(!userInfo){
//          res.send("user not found")
//        }else{
//         let validPass=   await bcrypt.compare(passWord,userInfo.passWord,)
//         if(validPass){
//          res.send("login ho gyaa")
//         }else{
//          res.send("pass sahi nhi haiiii")
//         }
//        }
       

//  })
 
// app.listen(3000,()=>{
//     console.log("Server is running on port 3000");
// })