const mongodb = require("mongodb");
const dotenv = require('dotenv');
dotenv.config();
const mongoClient = mongodb.MongoClient;
const MONGO_URL = process.env.MONGO_URL;

const resetpassword = async (req, res) => {
    try {
        //Queryvalue
        const requesttoken = req.body.tk;
        //Initiate connection
        let client = await mongoClient.connect(MONGO_URL);
        //Select db
        let db = client.db("FPadmin");
        //Check for the user
        let user = await db.collection('users').findOne({ resetPasswordToken: requesttoken, resetPasswordExpires: { $gt: new Date() } });
        //if user exists!
        if (user) {
            res.json({
                token: "valid",
                userid: user._id
            })
            //Close the connection
            await client.close();
        }
        else {
            res.json({
                message: "Invalid token"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

module.exports = resetpassword