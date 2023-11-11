const express = require('express'); // Include ExpressJS
const bodyParser = require('body-parser'); // Middleware
const path = require('path');
const session = require('express-session'); //for to destroy the login session
const db = require('./db');  //database required from folder

const app = express();// Create an ExpressJS app

//for to destroy login session key
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
//for to implement css
app.use('/Nikhil', express.static('Nikhil'));

//Route to Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to welcome Page
app.get('/welcome', (req, res) => {
    res.sendFile(__dirname + '/welcome.html');
});

// Route to Logout Page Page
app.get('/logout', (req, res) => {
    res.sendFile(__dirname + '/logout.html');
});

app.get('/timetable', (req, res) => {
    res.sendFile(__dirname + '/schedule.html');
});

app.get('/config', (req, res) => {
    res.sendFile(__dirname + '/config.json');
});

app.post('/signup', (req, res) => {
    const { email, crpassword, copassword } = req.body;
    const newUser = { email: email, crpassword: crpassword, copassword: copassword };

    if (crpassword !== copassword) {
        return res.send("create and confirm password do not match");
    }
    db.query('INSERT INTO login SET ?', newUser, (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.send('Error signing up.');
        }
        console.log('User registered:', result.insertId);
        res.send('User registered successfully!');
    });

});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.redirect('/logout.html');
        }
    });
});

app.get('/timetable', (req, res) => {
    // req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.redirect('/schedule.html');
        }
    // });
});

app.post('/login', (req, res) => {
    const { email, copassword } = req.body;
    db.query(
        ' SELECT * FROM login WHERE email = ? and copassword = ? ',
        [email, copassword],
        (err, results) => {
            if (err) throw err;

            if (results.length > 0) {
                res.redirect('/welcome');
            } else {
                res.send('Your Entered Password is Incorrect');
            }
        }
    );
});

const port = process.env.PORT ||8000 ;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
