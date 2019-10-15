var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'hospital'
})

connection.connect();
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/addPatient", (req, res) => {
  console.log(req.body)
  var sql = "insert into patient_info(" +
  "name,cont,descr,buiding,room,bed,state,id,hospital_id"
  + ") values ('"
  + req.body.name + "','"
  + req.body.cont + "','"
  + req.body.descr + "','"
  + req.body.building + "','"
  + req.body.room + "','"
  + req.body.bed + "','TRUE','"
  + Date.now() +"','"
  +req.body.hospital_id
  + "')";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err

    console.log('The solution is: ', rows[0]);
    res.json({ msg: "Hospital Added sucessfull!" });
  })
})
module.exports = router;
