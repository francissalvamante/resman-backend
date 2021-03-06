const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const UserModel = require('../model/User');

exports.verifyToken = function(req, res, next) {
    let token = req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }

        req.userId = decoded.id;
        next();
    })
}