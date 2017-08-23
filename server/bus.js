var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var BusSchema = new Schema({
	bus_id: String,
	stopDate: String,
	stopTime: String,
	totalIn: String,
	totalOut: String,
	lat: String,
	lng: String
},{ collection: 'app_busdata', versionKey: false });

exports.BusSchema = BusSchema;
//module.exports = mongoose.model('app_busdata', BusSchema);