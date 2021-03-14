var Product = require('../model/Product');

exports.getProducts = function(req, res) {
	console.log('in get request');
	Product.find({})
	.then(function(data) {
		res.json(data);
	})
	.catch(function(err) {
		res.json(err);
	})
}

exports.postProducts = function(req, res) {
	console.log('in post request');
	Product.create(req.body).then(function(dbProduct) {
		res.json(dbProduct);
	})
	.catch(function(err) {
		res.json(err);
	});
}