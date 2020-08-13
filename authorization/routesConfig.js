const VerifyUserMiddleware = require('./middlewares/verifyUserMiddleware');
const AuthorizationController = require('./controllers/authorizationController');
const AuthValidationMiddleware = require('../common/middlewares/authValidationMiddleware');

exports.routesConfig = function(app) {
	app.post('/auth', [
		VerifyUserMiddleware.hasAuthValidFields,
		VerifyUserMiddleware.isPasswordAndUserMatch,
		AuthorizationController.login
	]);

	app.post('/auth/refresh', [
		AuthValidationMiddleware.validJWTNeeded,
		AuthValidationMiddleware.verifyRefreshBodyField,
		AuthValidationMiddleware.validRefreshNeeded,
		AuthorizationController.login
	]);
};
