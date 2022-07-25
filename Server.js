const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const register = require('./Modules/Register');
const login = require('./Modules/Login')
const app = express();
const authenticate = require('./Modules/Authenticate');
const forgotpassword = require("./Modules/Forgotpassword");
const resetpassword = require("./Modules/Resetpassword");
const changepassword = require("./Modules/Changepassword");
const getUser = require("./Modules/Getuser");

dotenv.config();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

const PORT = process.env.PORT || 5000;

//Create User
app.post('/register', register)
//Login
app.post('/login', login)
//Homepage
app.get('/user', authenticate, getUser)
//Forgotpassword
app.post('/forgotpassword', forgotpassword);
//reset password
app.post('/resetpassword', resetpassword)
//Change password
app.post('/changepassword', changepassword)

app.listen(PORT, () => console.log(`App is running in ${PORT}`))