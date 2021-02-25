const rout = require("express").Router();
const fs = require('fs');


rout.get("/", (req, res)=> {
  fs.readFile('./logs.txt', (err,fileRead)=>{
    if(err){
      return console.log(err);
    }res.send(fileRead)
  })
 });

 module.exports = rout;