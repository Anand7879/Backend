// console.log("hello");

// let fs = require("fs");
// fs.writeFileSync("hello.txt", "Hello World");

// let data = fs.readFileSync("hello.txt", "utf-8");
// console.log(data.toString());

// fs.appendFileSync("hello.txt", "\nAppended Text");
// fs.unlinkSync("hello.txt");


// let os = require('os')
// console.log(os.homedir());
// console.log(os.platform());
// console.log(os.cpus());
// console.log(os.arch());
// console.log(os.freemem());
// console.log(os.totalmem());


let express = require("express");
let app = express();

app.use('/',(req, res, next) =>{
    // res.send("hello mai nahi jane dunga")
  next();
});

app.get("/",  (req, res) =>{
  res.send("Hello I am From Backend");
});

app.get("/about",  (req, res) =>{
  res.send("Hello I am From About Page");
});

app.listen(3000, ()=>{
  console.log("Server is running on port 3000");
});









