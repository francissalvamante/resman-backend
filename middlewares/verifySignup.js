const RoleModel = require('../model/Roles');
const User = require('../model/User');
const UserModel = require('../model/User');

exports.checkDuplicateUsernameAndEmail = function (req, res, next) { 
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

        if(user) {
            res.status(400).send({ message: "Failed! Username and/or Email is already in use!" });
            return;
        }

        next();
    });
}