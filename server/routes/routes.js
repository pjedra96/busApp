var express = require('express'),
    actions = require('../methods/methods');

var router = express.Router();

router.get('/', actions.message);
router.post('/authenticate', actions.authenticate);
router.post('/adduser', actions.addNew);
router.get('/getInfo', actions.getinfo);

module.exports=router;