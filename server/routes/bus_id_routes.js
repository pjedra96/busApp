var express = require('express');
var config = require('../config/config.json');

var app = module.exports = express.Router();
 
var Server = require('../server');

app.get('/findBuses', function (req, res) {
	//req.headers['if-none-match'] = 'no-match-for-this';
	Server.BusId.find({}, function (err, buses) {
		if (err) {
		  return res.json({ "success": false, "msg": "Error while searching for a Bus", "error": err });
		}
		res.status(200).json({ "success": true, "result": buses });
	});
});