var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusIdSchema = new Schema({
	code: String,
	lastdate: String,
	vt: String,
	active_utc: String,
	up_is_in: {
		type: Boolean,
        default: false}
},{ collection: 'bus_id_list', versionKey: false });
 
exports.BusIdSchema = BusIdSchema;
//module.exports = mongoose.model('app_busdata', BusSchema);