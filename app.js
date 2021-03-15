var express = require('express');
var mongoose = require('mongoose');
var prizes = require('./routes/prizes');
var cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI_STRING, { useNewUrlParser: true });

var PORT = process.env.PORT || 3000;

var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// app.get("/", function(req, res) {
// 	res.send("Hello from demo app!");
// });

app.get('/prizes', prizes.getPrizes);
app.get('/prize', prizes.getPrize);
app.post('/prize', prizes.postPrize);

app.listen(PORT, function() { console.log("Listening on port", PORT + "."); });
