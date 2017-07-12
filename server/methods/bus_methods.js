var Bus = require('../server');
var config = require('../config/config.json');

var functionality = {
	addBus: function(req, res){
        if(!req.body.bus_id){
            console.log(req.body.bus_id);
			
            res.json({success: false, msg: 'Enter all values'});
        }
        else {
            var newBus = Bus.Bus({
                bus_id: req.body.bus_id,
				stopDate: req.body.stopDate,
				stopTime: req.body.stopTime,
				passengerIn: req.body.passengerIn,
				passengerOut: req.body.passengerOut,
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
        }
    },
	message: function(req, res){
		if(req)
		{
			res.status(200).send({ "success": true, "msg": "Hello from the node runtime environment" });
		}else{
			return res.json({success:false, msg: 'Error while loading the message'})
		}
	}
};
module.exports = functionality;