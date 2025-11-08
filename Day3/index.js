// Authentication 
//Autheraization
// npm i mongoose
// npm ibcrypt

let express = require('express')
let mongoose = require('mongoose')


let app = express()
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/5thSem')
.then(() => {console.log('Connected to MongoDB')
.catch((err) => {console.error('Error connecting to MongoDB:', err)})
});

app.get('/',(req,res)=>{
    res.send("hiii")

 })

app.listen(4000,()=>{
    console.log("server running on port no 4000");
    
 })

