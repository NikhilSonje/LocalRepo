const mysql = require('mysql');
const db = mysql.createConnection({
    "host": "127.0.0.1",
    "user": "root",
    "password": "Nikhil@1212",
    "database": "loginpage"
})

db.connect((err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Connected")
    }
});
module.exports = db;