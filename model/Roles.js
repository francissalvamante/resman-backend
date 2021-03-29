const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RoleSchema = new Schema({
    name: String
});

RoleSchema.index({ name: -1 });

var Role = mongoose.model("Role", RoleSchema);

module.exports = Role;