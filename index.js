const express = require("express");
const config = require("./config/config.json");
const routerEmployee = require("./routes/employee");

const app = express();  // creates a new express application
app.use((request, response, next)=>{
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Headers',"*");
    response.setHeader('Access-Control-Allow-Methods', "*")
    next();
  })
  
app.use(express.json()); // middleware : parse the json data from request into request.body 
app.use("/employee",routerEmployee); 
const port = config.port;
app.listen(port,()=>{

    console.log("server is running on port "+port)
})

