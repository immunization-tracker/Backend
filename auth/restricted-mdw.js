const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
            if(err){
                res.status(401).json({ message: "Invalid token, you shall not pass!"})
            } else {
                req.user = { id: decodeToken.id, username: decodeToken.username }
                next()
            }
        })
    } else {
        res.status(400).json({ message: "Forbidden, you must log in!"})
    }

}