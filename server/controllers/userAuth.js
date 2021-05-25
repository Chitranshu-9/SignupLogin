
const userSchema = require('../models/userModel');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const { response } = require('express');
const client = new OAuth2Client(process.env.GoogleClientID);
//******Controllers******
module.exports.home = function (req, res) {
    return res.send('home');
}

//controller for registering a user

module.exports.register = async function (req, res) {
    const { name, email, password, confirm_password } = req.body;

    console.log("data from req", name, email, password, confirm_password);

    //if password matched confirm password?
    if (confirm_password != password) {
        return res.status(400).send({ msg: "password doen't mathces confirm password" });
    }
    //Checking if email already exists
    const emailExist = await userSchema.findOne({ email: email });
    if (emailExist) {
        return res.status(403).send({ msg: "user already exists" });
    }


    //Encrypting passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Creating user
    let user = new userSchema({
        name,
        email,
        password: hashedPassword
    });
    let response = await user.save()
    console.log("user", user);
    return res.status(200).send({ msg: "Registered Successfully" });
}

//controller for user login
module.exports.login = async function (req, res) {
    const cookie = req.session;
    console.log("session ", cookie);
    const { email, password } = req.body;
    // console.log("email ", email, "password", password);
    if (email == 'undefined ' || password == 'undefined') {
        return res.status(403).send({ msg: "User does not exists" });
    }

    const foundUser = await userSchema.findOne({ email: email });
    // console.log("foundUser", foundUser);
    if (!foundUser) {
        return res.status(403).send({ msg: "User does not exists" });
    }


    await bcrypt.compare(password, foundUser.password, async function (err, user) {
        if (err) {
            return res.status(403).send({ msg: "Email or Passwor is incorrect" });
        } else if (user) {
            // setup user in session cookie with email
            cookie.user_detail = req.body.email;
            cookie.UserType = 'Local';
            console.log("user from session", cookie.user_detail);

            return res.status(200).send({ msg: "Logged in Successfully", userName: foundUser.name, user: foundUser });
        } else {
            return res.status(403).send({ msg: "Email or Password is incorrect" });
        }
    })
    // console.log("founded user", foundUser);
    // return res.send('login');
}

//controller for changing password
module.exports.changePassword = async function (req, res) {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const { user_detail } = req.session;
    const { UserType } = req.session;
    // console.log("cookie from google user", req.session);
    //If google user 
    if (UserType == 'google') {
        return res.status(403).send({ msg: "Cannot Change Passwords" });
    }
    //checking if new password is correct
    if (newPassword != confirmNewPassword) {
        return res.status(403).send({ msg: "New Password does not matches Confirm Password" });
    }

    //validating if request is from the same user
    if (user_detail) {
        const checkUserEmail = await userSchema.findOne({ email: user_detail });
        // console.log("user detail from session", user_detail, "and session user is: ", checkUserEmail);

        //Confirming Old Password and updating
        let old_password = await bcrypt.compare(oldPassword, checkUserEmail.password, async function (err, isOldPassword) {
            if (err) {
                consolelog("err from changing password comparison", err)
                return res.status(403).send({ Error: "Internal server Error" });
            } else if (isOldPassword) {
                console.log(isOldPassword);

                //Encrypting passwords
                const salt = await bcrypt.genSalt(10);
                const newHashedPassword = await bcrypt.hash(newPassword, salt);

                //updating user with new Password
                const updatedUser = await userSchema.findOneAndUpdate({ email: user_detail }, { password: newHashedPassword })
                console.log("user password updated", updatedUser);
                return res.status(200).send({ msg: "Password updated Successfully" });
            } else {
                return res.status(403).send({ msg: "Email or Password is incorrect" });
            }

        })

    } else {
        return res.status(403).send({ msg: "Session Time Out..!!!" });
    }
}


//controller for logout route
module.exports.logout = function (req, res) {
    req.session = null;
    req.logout();
    return res.status(200).send({ msg: "Logged Out Successfully" });
}


//controller for google login
module.exports.googleLogin = function (req, res) {
    const { tokenId } = req.body;
    console.log(req.body.tokenId);
    const cookie = req.session;
    // console.log("session from google", cookie);
    client.verifyIdToken({ idToken: tokenId, audience: process.env.GoogleClientID }).then(async response => {
        const { email_verified, email, name } = response.payload;
        if (email_verified) {
            const foundUser = await userSchema.findOne({ email: email })

            if (foundUser) {
                //If user already exists
                console.log("foundUser", foundUser);
                cookie.user_detail = email;
                cookie.UserType = 'google';
                console.log("google cookie", cookie.UserType);
                return res.status(200).send({ msg: "Logged in successfully", userName: foundUser.name, userDetail: foundUser });
            } else if (!foundUser) {
                //Creating User
                //Encrypting passwords
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(email, salt);

                //Creating user
                let user = new userSchema({
                    name,
                    email,
                    password: hashedPassword
                });
                let response = await user.save();
                return res.status(201).send({ msg: "Registered Successfully" });
            } else {
                return res.status(400).send({ msg: "Something went wrong" });
            }

        }
    })
    // console.log("tokenId", tokenId);
    // return res.status(200).send({ msg: "Logged In Successfully" });
}
