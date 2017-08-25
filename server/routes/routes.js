var express = require('express');
var config = require('../config/config.json');
var jwt = require('jwt-simple');
var app = module.exports = express.Router();
 
var Server = require('../server');

module.exports = function(app){
	app.get('/', function(req, res){
		if(req)
		{
			res.status(200).send({ "success": true, "msg": "Hello from the node runtime environment" });
		}else{
			return res.json({success:false, msg: 'Error while loading the message'})
		}
	});
	app.post('/authenticate', function(req, res) {
        Server.Users.findOne({
            username: req.body.username
        }, function(err, user){
            if (err) throw err;
            if(!user){
                res.json({success: false, msg: 'Authenticaton failed, user not found.'});
            } else {
                user.comparePassword(req.body.password, function(err, isMatch){
                    if(isMatch && !err) {
                        var token = jwt.encode(user, config.secret);
                        res.json({success: true, token: token});
                    } else {
                        res.json({success: false, msg: 'Authenticaton failed, wrong password.'});
                    }
                })
            }
        })
    });
	app.post('/adduser', function(req, res){
        if((!req.body.username) || (!req.body.password)){
            console.log(req.body.username);
            console.log(req.body.password);
            
            res.json({success: false, msg: 'Enter all values'});
        }
        else {
            var newUser = Server.Users({
                username: req.body.username,
                password: req.body.password
            });
            
            newUser.save(function(err, newUser){
                if (err){
                    res.json({success:false, msg:'Failed to save'})
                }
                
                else {
                    res.json({success:true, msg:'Successfully saved'});
                }
            })
        }
    });
	app.get('/getInfo', function(req, res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1];
            var decodedtoken = jwt.decode(token, config.secret);
            return res.json({success: true, msg: decodedtoken.username});
        }
        else {
            return res.json({success:false, msg: 'No header'});
        }
    });
};