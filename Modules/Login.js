const mongodb = require("mongodb");
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();
const mongoClient = mongodb.MongoClient;
const MONGO_URL = process.env.MONGO_URL;

const login = async (req, res) => {
    try {
        //Initiate connection
        let client = await mongoClient.connect(MONGO_URL);
        //Select db
        let db = client.db("FPadmin");
        //Check user exists
        let user = await db.collection('users').findOne({ email: req.body.email });
        if (user) {
            let matchPassword = bcrypt.compareSync(req.body.password, user.password);
            if (matchPassword) {
                //jwt token
                let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
                await client.close();
                res.json({
                    message: "Success",
                    token: token
                });
            }
            else {
                res.status(404).json({
                    message: "email/password doesnot match"
                })
            }
        }
        else {
            res.status(404).json({
                message: "email/password doesnot match"
            })
        }
    } catch (error) {
        res.status(403).json({
            message: "Something went wrong!"
        })
    }
}

module.exports = login