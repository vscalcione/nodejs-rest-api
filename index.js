const config = require('./common/config/envConfig.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const AuthorizationRouter = require('./authorization/routesConfig');
const UsersRouter = require('./users/routesConfig');

app.use(function(res, req, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
	res.header('Access-Control-Expose-Headers', 'Content-Length');
	res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
	if (req.method === 'OPTIONS') {
		return res.send(200);
	} else {
		return next();
	}
});

app.use(bodyParser.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);

app.listen(config.port, function() {
	console.log(`App listening at port ${config.port}`);
});
