var Prizes = require('../model/Prize');

exports.getPrizes = function(req, res) {
	Prizes.find({})
	.then(function(data) {
		res.json(data);
	})
	.catch(function(err) {
		res.status(500).send({ data: false, message: "An unknown error has occured" });
	})
}

exports.getPrize = function(req, res) {
	Prizes.findOne({
		_id: req.query._id
	}).then(function(data) {
		res.json(data);
	})
	.catch(function(err) {
		res.status(500).send({ data: false, message: "An unknown error has occured" });
	})
}

exports.postPrize = function(req, res) {
	Prizes.findOneAndUpdate({ _id: req.body._id, quantity: { $gt: 0 } }, { "$inc": { quantity: -1 } }, { new: true }, function(err, doc) {
		if(err) res.status(500).send({ data: false, message: "An unknown error has occured" });

		if(!doc) {
			res.send({ updated: false, message: "Out of stock" });
			return;
		}

		res.send({doc, updated: true});
	})
}