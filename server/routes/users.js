const router = require("express").Router();
const usersController = require('../controllers/userAuth');
var multer = require('multer');
var upload = multer();
const passport = require("passport");
require("../config/passport-googleOAuth");

//route for user registeration 
router.post('/register', upload.none(), usersController.register);


//route for user login
router.post('/login', upload.none(), usersController.login);

//passport.authenticate("google", { scope: ["profile", "email"] })
//route for Google Login
router.post('/google', upload.none(), usersController.googleLogin);

//callback route for google auth
router.get('/google/callback', usersController.googleLogin);
//route for changing password
router.post('/changePassword', upload.none(), usersController.changePassword);

//route for changing password
router.post('/logout', upload.none(), usersController.logout);

module.exports = router;