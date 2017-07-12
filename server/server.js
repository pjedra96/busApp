var mongoose = require('mongoose'),
    express = require('express'),
	cors = require('cors'),
	config = require('./config/config.json'),
    morgan  = require('morgan'),
    http = require('http'),
	passport = require('passport'),
	routes = require('./routes/routes'),
	routes_bus = require('./routes/routes_bus'),
	bodyParser = require('body-parser'),
	user = require('./user'),
	bus = require('./bus'),
	db,
	novas;
	
// connect to mongo
db = mongoose.createConnection(config.database),
Users = db.model('users', user.UserSchema);
m = new Users;
m.save();

db.on('open', function(){
	console.log("\nMongo1 set up");
	
	var app = express();
	app.use(morgan('dev'));
    app.use(cors());

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.use(routes);
    app.use(passport.initialize());
    require('./config/passport')(passport);

    app.listen(3001, function (err) {
       console.log('Server is running at: ' + 'http://localhost:3001');
    });
});

novas = mongoose.createConnection(config.novas);
Bus = novas.model('app_busdata', bus.BusSchema);

novas.on('open', function(){
	console.log("\nMongo2 set up");
		var app2 = express();
		app2.use(morgan('dev'));
		app2.use(cors());
		
		app2.use(bodyParser.urlencoded({extended: false}));
		app2.use(bodyParser.json());

		app2.use(routes_bus);
		
		app2.listen(3333, function (err) {
		   console.log('Server is running at: ' + 'http://localhost:3333')
		});
});

exports.Users = Users;
exports.Bus = Bus;

// Alternative method of connecting to MongoDb (old method - supports only 1 connection at a time)

// connect to mongo
/*mongoose.connect(config.database, {useMongoClient: true});
mongoose.connection.on('open', function () {

    console.log('\nMongo is open');
    var app = express();
    app.use(morgan('dev'));
    app.use(cors());

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.use(routes);
    app.use(passport.initialize());
    require('./config/passport')(passport);

    app.listen(3001, function (err) {
       console.log('Server is running at: ' + 'http://localhost:3001');
    });
	
});*/