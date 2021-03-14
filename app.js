var express = require('express');
var mongoose = require('mongoose');
var prizes = require('./routes/prizes');
var cors = require('cors');

mongoose.connect("mongodb://localhost:27017/demo", { useNewUrlParser: true });

var PORT = 3000;

var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", function(req, res) {
	res.send("Hello from demo app!");
});

// app.post("/product", products.postProducts);
// app.get('/product', products.getProducts);
app.get('/prize', prizes.getPrizes);

app.listen(PORT, function() { console.log("Listening on port", PORT + "."); });
