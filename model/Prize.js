var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var PrizeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: String, required: true },
    quantity: { type: String, required: true }
}, { timestamp: true });

var Prize = mongoose.model("Prize", PrizeSchema);

module.exports = Prize;