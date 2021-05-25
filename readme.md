
# User_SignUp_Login_FullStack
 A FullStack application for Signing Up/ Signing In a use, Plus backend as a reusable api for the same.
## App Look- Login/Registeration Page
 Reigsteration/Login Page: -'http://localhost:3000/registerLogin'
![alt text](https://github.com/Chitranshu-9/User_SignUp_Login_FullStack/blob/main/App%20Look.png)
## Access Page
 Reigsteration/Login Page: -'http://localhost:3000/authRoute'
![alt text](https://github.com/Chitranshu-9/User_SignUp_Login_FullStack/blob/main/Access%20Page.png)

## Features
  1. Registering A user, both Manual and Google Authentication.
  2. Signing In the user both Manual and Google Authentication.
  3. LogOut functionality.
  4. Changing Password.

## API routes
  - Signing Up a user
    - Manual Registeration ('localhost:8000/users/register')
    - Google Registeration ('localhost:8000/users/google')
  - Signing In a user
    - Manual Login ('localhost:8000/users/login')
    - Google Login ('localhost:8000/users/google')
  - Chaging Password
    - 'localhost:8000/users/changePassword'
  - LogOut Route
    -'localhost:8000/users/logout'
   
## API Response
 - Signing Up a user(Manual Registeration)
   - Backend (Success)
    -Result: data: {msg: "Registered Successfully"}, status: 200
   - Frontend (Success)
   - ![alt text](https://github.com/Chitranshu-9/User_SignUp_Login_FullStack/blob/main/Successfully%20registering%20user.png)
   - Backend (Error)
     -(Existing User): data: {msg: "user already exists"}, status: 403
    - Frontend (Error)
    - ![alt text](https://github.com/Chitranshu-9/User_SignUp_Login_FullStack/blob/main/SignUp%20error%20for%20existing%20user.png)
   - Backend (Error)
     -(Matching Password): data: {msg: "password doen't mathces confirm password"}, status: 400
    - Frontend (Error)
    - ![alt text](https://github.com/Chitranshu-9/User_SignUp_Login_FullStack/blob/main/Signup%20Error%20for%20confirm%20password.png)
 - Logging In(Manual)
   - Backend (Success)
    -Result: data: {"msg": "Logged in Successfully",
    "userName": "demo user",
    "user": {
        "_id": "609905c1fb04b429802d6143",
        "name": "demo user",
        "email": "demouser@demouser.com",
        "password": "$2b$10$sujKK8yVGuTGTHWTwmvO4usSWvHOU2tDu6.SNWFq00fxs/8/GsruK",
        "createdAt": "2021-05-10T10:06:57.154Z",
        "updatedAt": "2021-05-20T10:59:35.331Z",
        "__v": 0
    }, status: 200}
   - Frontend (Success)
   - ![alt text](https://github.com/Chitranshu-9/User_SignUp_Login_FullStack/blob/main/login%20success.png)
   - Backend (Error)
     -(Existing User): data: {"msg": "Email or Password is incorrect"}, status: 403
    - Frontend (Error)
    - ![alt text](https://github.com/Chitranshu-9/User_SignUp_Login_FullStack/blob/main/login%20error.png)
 - Signing Up/ Logging In a user(Google)
   -Success
   - ![alt text](https://github.com/Chitranshu-9/User_SignUp_Login_FullStack/blob/main/Google%20Login_Registeration%20consent%20screen.png)
## Changing Password
- Backend (Success)
    -Result: data: {msg: "Password updated Successfully"}, status: 200
- Frontend (Success)
   - ![alt text](https://github.com/Chitranshu-9/User_SignUp_Login_FullStack/blob/main/Login%20user%20change%20password%20success.png)
- Backend (Error)
    -Result: data: {msg: "Email or Password is incorrect"}, status: 403
- Frontend (Error)
   - ![alt text](https://github.com/Chitranshu-9/User_SignUp_Login_FullStack/blob/main/password%20change%20error.png)
## Logout
- Backend (Success)
    -Result: data: {msg: "Logged Out Successfully"}, status: 200
- Frontend (Success)
   - ![alt text](https://github.com/Chitranshu-9/User_SignUp_Login_FullStack/blob/main/logout%20Success.png)
## Tips and Notes:-
 - To work with a Frontend Application while sending request to the server for authentication make sure you configure your request to creadentials as well
   - For example while sending request with axios, first create an instance of axios and store it in a constant:- e.g.-> const HTTP = axios.create({
            withCredentials: true
        });
 - Server Folder Structure :-
```bash
├──server
   ├───/config
   ├───/controllers
   ├───/models
   ├───/routes
```
- Client Folder Structure :- 
```bash
├──client
   ├───/user_signup_login
       ├───/pulic
       ├───/src
           ├───/components
               ├───LoginComponent.js
               ├───SignupComponent.js
           ├───/helpers
               ├───auth_helper.js
               ├───Context.js
           ├───/pages
               ├───AccessPage.js
               ├───SignupLoginPage.js
           ├───App.css
           ├───App.js
```
                                         
