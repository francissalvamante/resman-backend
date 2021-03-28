var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var PrizeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    quantity: { type: Number, required: true },
    sequenceNumber: { type: Number, index: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamp: true });

PrizeSchema.plugin(autoIncrement.plugin, { model: 'Prize', field: 'sequenceNumber' });

PrizeSchema.index({ sequenceNumber: -1 });
PrizeSchema.index({ name: -1 });

var Prize = mongoose.model("Prize", PrizeSchema);

module.exports = Prize;