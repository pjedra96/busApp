var mongoose = require('mongoose'),
    express = require('express'),
	cors = require('cors'),
	fs = require('fs'),
	config = require('./config/config.json'),
    morgan  = require('morgan'),
    http = require('http'),
	https = require('https'),
	passport = require('passport'),
	routes = require('./routes/routes'),
	routes_bus = require('./routes/routes_bus'),
	bodyParser = require('body-parser'),
	user = require('./user'),
	bus = require('./bus'),
	busId = require('./bus_id'),
	db_list = require('./db_list'),
	privateKey = fs.readFileSync('/etc/ssl/urbansensingltd.com.key', 'utf8'),
	certificate = fs.readFileSync('/etc/ssl/urbansensingltd.com.chained.crt', 'utf8');
	
	var credentials ={key: privateKey, cert: certificate};
	
	var app = express();
	app.use(morgan('dev'));
    app.use(cors());

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
	
	require('./config/passport')(passport);
	app.use(passport.initialize());
	
	routes(app);
	routes_bus(app);
	
// connect to mongo
urb_sense = mongoose.createConnection(config.urb_sense),
Users = urb_sense.model('users', user.UserSchema);
dbList = urb_sense.model('db_by_client', db_list.DbListSchema);
m = new Users;
m.save();

urb_sense.on('open', function(){
	console.log("\nMongo1 set up (UrbSense_Monitor)");
});

/*novas = mongoose.createConnection(config.novas);
Bus = novas.model('app_busdata', bus.BusSchema);
BusId = novas.model('bus_id_list', busId.BusIdSchema);

novas.on('open', function(){
	console.log("\nMongo2 set up (Novas_vn)");
});

inari = mongoose.createConnection(config.inari);
BusInari = inari.model('app_busdata', bus.BusSchema);
BusIdInari = inari.model('bus_id_list', busId.BusIdSchema);

inari.on('open', function(){
	console.log("\nMongo3 set up (inari_library)");		
});

mahendra = mongoose.createConnection(config.mahendra);
BusMahendra = mahendra.model('app_busdata', bus.BusSchema);
BusIdMahendra = mahendra.model('bus_id_list', busId.BusIdSchema);

mahendra.on('open', function(){
	console.log("\nMongo4 set up (mahendra)");
});*/


// Function to be called to generate a custom connection
exports.generateConnection = function(dbname){
	var urlPrefix = "mongodb://Peter:Biodata01@cluster0-shard-00-00-7kwa9.mongodb.net:27017,cluster0-shard-00-01-7kwa9.mongodb.net:27017,cluster0-shard-00-02-7kwa9.mongodb.net:27017/";
	var urlSuffix = "?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
	var url = urlPrefix + dbname + urlSuffix;
	
/*	var model = connection.model('app_busdata', app_busdata.AppBus);
	var model2 = connection.model('busdata', busData.BusData);*/

	if(connectionArray.length == 0){
		var conn = mongoose.createConnection(url);
		conn.on('open', function(){
			console.log("\nMongo set up :" + dbname);
		});
		connectionArray.push(conn);
		return conn;
	}else if(connectionArray.length > 0){
		for (i = 0; i < connectionArray.length; i++) {
	    	if(connectionArray[i].name == dbname){
	    		return connectionArray[i];
	    	}else{
	    		var conn = mongoose.createConnection(url);
				conn.on('open', function(){
					console.log("\nMongo set up :" + dbname);
				});
				connectionArray.push(conn);
	    	}
	    }
	}
}

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(8443, function(err){
	console.log('Server is running at: ' + 'https://localhost:8443');
});

app.listen(3001, function (err) {
   console.log('Server is running at: ' + 'http://localhost:3001');
});


exports.Users = Users;
exports.dbList = dbList;
/*exports.Bus = Bus;
exports.BusId = BusId;
exports.BusInari = BusInari;
exports.BusIdInari = BusIdInari;
exports.BusMahendra = BusMahendra;
exports.BusIdMahendra = BusIdMahendra;*/