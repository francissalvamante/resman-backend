var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var ProductSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    departments: { type: Array, required: true },
    sequenceNumber: { type: Number, index: true }
}, { timestamp: true });

ProductSchema.plugin(autoIncrement.plugin, { model: 'Product', field: 'sequenceNumber' })

ProductSchema.index({ _id: -1 });
ProductSchema.index({ sequenceNumber: -1 });

var Product = mongoose.model("Product", ProductSchema);

module.exports = Product;