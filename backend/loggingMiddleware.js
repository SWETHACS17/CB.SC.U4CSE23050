const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors);

//sample Log
let Log = [
    {"stack" :"backend" ,"level" : "error" , "package" : "handler" , "message" : "receive string, expected bool"},
];
//To add a new log
app.post("/logs" , (req,res) => {
    const log = {
    
     "stack" :req.params.stack ,
     "level" : req.params.level,
     "package" : req.params.package , 
     "message" : req.params.message
     }
  logs.push(log);
  res.json(log);
});

//TO fetch all the logs
app.get("/logs" , (req,res) =>{
    res.json(logs);
});

//starting server
app.listen(5000, () =>{
 console.log("Running in port 5000");
});