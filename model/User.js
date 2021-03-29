var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var UserSchema = new Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    sequenceNumber: { type: Number, index: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamp: true })

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'sequenceNumber' });

UserSchema.index({ sequenceNumber: -1 });

var User = mongoose.model('User', UserSchema);

module.exports = User;