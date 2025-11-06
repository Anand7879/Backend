let express = require("express");
let app = express();


// app.get("/:id",  (req, res) =>{
//     let data = req.params
//     res.send(data)
//   res.send("Hello I am From Backend");
  
// });

let arr = ['cat','dog','cat','dog']
app.get("/:ani",  (req, res) =>{
    let {ani} = req.params
    let data = arr.filter((a)=>{
        return a==ani
    })
    res.send(data)
//   res.send("Hello I am From Backend");
  
});



app.listen(3000, ()=>{
  console.log("Server is running on port 3000");
});
