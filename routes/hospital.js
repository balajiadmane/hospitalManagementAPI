var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
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

router.post("/registerHospital", (req, res) => {
    console.log(req.body)

    var sql = "insert into hospital_info(" +
        "name,contact,email,address,password,id"
        + ") values ('"
        + req.body.name + "','"
        + req.body.contact + "','"
        + req.body.email + "','"
        + req.body.address + "','"
        + req.body.password + "','"
        + Date.now()
        + "')";
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err

        console.log('The solution is: ', rows[0]);
        res.json({ msg: "Thanks for registration!" });
    })
})

//---------------list of patient

router.get("/patientsList", (req, res) => {
    console.log(req.query.id);

    var sql = "select * from patient_info where hospital_id ='"+req.query.id+"';";
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err

        console.log('The solution is: ', rows[0]);
        var tmp = JSON.stringify(rows);
        var user = JSON.parse(tmp);
        res.json(user);
    })
})

//---------------------add patient bills
router.post("/addPatientBill", (req, res) => {
    console.log(req.body);
    var sql = "update patient_info set bill = '" + req.body.Bills + "' where id ='" + req.body.id + "'";
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err

        console.log('The solution is: ', rows[0]);
        res.json({ msg: "Added!" });
    })
})
router.put("/releasePation",(req,res)=>{
    console.log(req.body);
    var sql = "update patient_info set state = '" + req.body.state + "' where id ='" + req.body.id + "'";
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err

        console.log('The solution is: ', rows[0]);
        if(req.body.state === "TRUE"){
            res.json({ msg: "Patient not released!" });
        }else{
            res.json({ msg: "Patient released!" });
        }
       
    })
})
//---------login hospital
router.post("/loginHospital", (req, res) => {
    console.log(req.body)
    var sql = "select * from hospital_info where email = '" + req.body.email + "' and password = '" + req.body.password + "'";
    connection.query(sql, function (err, rows, fields) {
        if (err) throw err
        var tmp = JSON.stringify(rows);
        var user = JSON.parse(tmp);
        if (user.length === 0) {
            res.status(404).json({ msg: "User is not exits" });
        } else {
            console.log(user[0].id)
            var token = jwt.sign({ foo: req.body.email }, 'shhhhh');
            res.json({ msg: "Login successfull!", token: token ,id:user[0].id });
        }
        // res.json({ msg: "Login successfull!" });
    })
});
module.exports = router;
