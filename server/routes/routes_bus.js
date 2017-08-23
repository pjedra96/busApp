var express = require('express');
var config = require('../config/config.json');

var app = module.exports = express.Router();
 
var Server = require('../server');
var model;

module.exports = function(app){
	app.get('/',  function(req, res){
		if(req)
		{
			res.status(200).send({ "success": true, "msg": "Hello from the node runtime environment" });
		}else{
			return res.json({success:false, msg: 'Error while loading the message'});
		}
	});
	app.get('/findOperators', function(req,res){
		Server.dbList.find({},  function(err, operators){
			if(err){
				return res.json({ "success": false, "msg": "Error while searching for operators", "error": err });
			}
			res.status(200).json({ "success": true, "result": operators });
		});
	});
	app.get('/findBuses/:dbname', function(req,res){
			var dbname = req.params.dbname;
			
			if(dbname == "Novas_vn"){
				model = Server.BusId;
			}else if(dbname == "inari_library"){
				model = Server.BusIdInari;
			}else if(dbname == "mahendra"){
				model = Server.BusIdMahendra;
			}else{
				var connection = Server.generateConnection(dbname);
				model = connection.newCompanyIds;
			}

			model.find({}, function (err, buses) {
					if (err) {
						return res.json({ "success": false, "msg": "Error while searching for a list of buses", "error": err });
					}
					return res.status(200).json({ "success": true, "result": buses });
			});
	});

	app.post('/addbus', function(req, res){
			var dbname = req.body.database;
			
			if(dbname == "Novas_vn"){
				model = Server.Bus;
			}else if(dbname == "inari_library"){
				model = Server.BusInari;
			}else if(dbname == "mahendra"){
				model = Server.BusMahendra;
			}else{
				var connection = Server.generateConnection(dbname);
				model = connection.newCompany;
			}
				
			var newBus = model({
				bus_id: req.body.bus_id,
				stopDate: req.body.stopDate,
				stopTime: req.body.stopTime,
				totalIn: req.body.totalIn,
				totalOut: req.body.totalOut,
				lat: req.body.lat,
				lng: req.body.lng
			});
				
			newBus.save(function(err, newBus){
				if (err){
					res.json({success:false, msg:'Failed to save'})
				}
				else {
					res.json({success:true, msg:'Successfully saved'});
				}
			})
	});
};