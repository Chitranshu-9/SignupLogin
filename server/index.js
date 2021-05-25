
const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
var multer = require('multer');
const passport = require('passport');
require('dotenv').config();
const db = require("./config/mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
require("./config/passport-googleOAuth");
// const bodyparser = require("body-parser");
const PORT = process.env.PORT;

//setting up body parser to read urlencoded bodies and JSON

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setting up cors to allow frontend applications to communicate

app.use(cors());
app.use(cors({ origin: true, credentials: true, }));

//body-parser middleware to read form data
// app.use(bodyparser.urlencoded({ extended: false }));
// app.use(bodyparser.json());

//Setting up Mongo Store

const sessionStore = MongoStore.create({
    mongoUrl: process.env.ATLAS_signup_login,
    collectionName: 'sessions'
})

//Setting up sessions ---- cookie duration(for a day)

app.use(session({
    secret: process.env.Session_Secret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));


// { extended: true }
//congfiguration for app
app.use(cookieParser());

//Configure Passport
app.use(passport.initialize());
app.use(passport.session());



app.listen(PORT, function (err) {
    if (err) {
        console.log(`err: ${err}`);
    }
    console.log(`Server running on port: ${PORT}`);
});

app.use('/', require('./routes/index'));