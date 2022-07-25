const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticate = (req, res, next) => {
    try {

        if (!req.headers.authorization) { return res.status(403).json({ message: "No token present" }) }
        else if (req.headers.authorization) {
            let correctToken = jwt.verify(req.headers.authorization, process.env.SECRET_KEY, (err, decoded) => {
                if (err) { return res.status(403).json({ message: "Not authorised" }) }
                else {
                    req.body.userid = decoded.id;
                    next();
                }
            })
        } else {
            res.status(403)
        }
    } catch (error) {

    }
}

module.exports = authenticate