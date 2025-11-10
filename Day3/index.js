// Authentication 
//Autheraization
// npm i mongoose
// npm ibcrypt

let express = require('express')
let mongoose = require('mongoose')

  let User=    require('./user')
   let bcrypt=    require('bcrypt')


let app = express()
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/5thSem')
.then(() => {console.log('Connected to MongoDB')
});

app.get('/',(req,res)=>{
    res.send("hiii")

 })

  app.post('/create',  async(req,res)=>{
          let {userName,email,passWord}=   req.body
      console.log(userName,email ,"heheh");
      
     let user=     await  User.findOne({email})
     console.log(user,"hiiii");
     
     if(user){
        res.send("user jinda haiii")
     }
         let updatedP=     await  bcrypt.hash(passWord,10)
         console.log(updatedP,"HEH");
         
        let userData=   new  User({
            userName,
            email,
            passWord:updatedP
         })
              await userData.save()
              res.send("account ban gya hai....")
            //   console.log(userName,email, passWord);
            
 })
 
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})