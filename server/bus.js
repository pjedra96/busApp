var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var BusSchema = new Schema({
	bus_id: String,
	bus_operator: String,
	stopDate: String,
	stopTime: String,
	passengerIn: String,
	passengerOut: String,
	lat: String,
	lng: String
},{ collection: 'app_busdata', versionKey: false });
 
/*BusSchema.pre('save', function (next) {
    var data = this;
    // get the current date
    var currentDate = new Date();
	var date = currentDate.getDay() + '.'+ currentDate.getMonth() + '.' + currentDate.getFullYear();
	var time = currentDate.getHours() + ':' + currentDate.getMinutes() + ":" + currentDate.getSeconds();
 
    // if date doesn't exist, add to that field
    if (!data.stopDate || !data.stopTime) {
        data.stopDate = date;
		data.stopTime = time;
    }
    next();
});/*/

exports.BusSchema = BusSchema;
//module.exports = mongoose.model('app_busdata', BusSchema);