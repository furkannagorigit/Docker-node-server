const express = require("express");
const sql = require("mysql");
const config = require("../config/config.json");
const router = express.Router();
const { stringify } = require('querystring');
const { request } = require("http");

var connection = sql.createConnection(
{
    host     : 'localhost',
    user     : config.user,
    password : config.password,
    database : config.database
}
)

router.get("/",(request,response)=>
{ 
    var dataToBeSend;
    connection.query('select * from employee',function(error,results,fields){
        if (error) throw error;
        dataToBeSend = JSON.stringify(results);
        response.setHeader('Content-type','application/json');
        response.send(dataToBeSend);
        response.end();
    })
})


router.post("/",(request,response)=>
{
    var dataToBeAdded = request.body;
    var dataToBeSend;
    connection.query(`INSERT INTO employee (name, email, password, emp_id, dname, doj) VALUES ('${dataToBeAdded.name}', '${dataToBeAdded.email}', '${dataToBeAdded.password}', '${dataToBeAdded.emp_id}', '${dataToBeAdded.dname}', '${dataToBeAdded.doj}');`,function(error,results,fields){
        if (error) throw error;
        dataToBeSend = JSON.stringify(results);
        response.setHeader('Content-type','application/json');
        response.send(dataToBeSend);
        response.end();
    })
})

router.put("/:id",(request,response)=>
{
    var dataToBeUpdated = request.body;
    var dataToBeSend;
    console.log(request.params.id);
    connection.query(`UPDATE employee SET dname = "${dataToBeUpdated.dname}", doj = "${dataToBeUpdated.doj}" WHERE emp_id="${request.params.id}";`,function(error,results,fields){
        if (error) throw error;
        dataToBeSend = JSON.stringify(results);
        response.setHeader('Content-type','application/json');
        response.send(dataToBeSend);
        response.end();
    })
})

router.delete("/:id",(request,response)=>
{
    var idByDeleted = request.params.id;
    var dataToBeSend;
    connection.query(`DELETE from employee WHERE emp_id = "${idByDeleted}";`,function(error,results,fields){
        if (error) throw error;
        dataToBeSend = JSON.stringify(results);
        response.setHeader('Content-type','application/json');
        response.send(dataToBeSend);
        response.end();
    })
})
module.exports = router;