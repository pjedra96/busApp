var express = require('express'),
    methods = require('../methods/bus_methods');

var router_bus = express.Router();

router_bus.get('/', methods.message);
router_bus.post('/addbus', methods.addBus);

module.exports=router_bus;