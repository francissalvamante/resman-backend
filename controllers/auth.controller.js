const config = require('../config/auth.config');
const UserModel = require('../model/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const User = require('../model/User');

exports.signup = function(req, res) { 
    const user = new UserModel({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save(function(err, user) {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }

        if(user) {
            res.status(200).send({ message: "User was registered successfully" });
        }
    })
}

exports.signin = function(req, res) {
    User.findOne({ 
        $or: [
            { username: req.body.username },
            { email: req.body.email }
        ]
    }).exec(function(err, user) {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }

        if(!user) {
            return res.status(400).send({ message: "User not found." });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid password!'
            })
        }

        var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });

        res.status(200).send({
            id: user._id,
            username: user.username,
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
            accessToken: token
        });
    })
}