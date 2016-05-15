var auth = {
	isAuthenticated:  function (req, res, next) {
		// if user is authenticated in the session, call the next() to call the next request handler
		// Passport adds this method to request object. A middleware is allowed to add properties to
		// request and response objects
		if (req.isAuthenticated())
			return next();
		// if the user is not authenticated then redirect him to the login page
		res.redirect('/auth/login');
	},
	isAdminAuthenticated:  function (req, res, next) {
		// if user is authenticated in the session, call the next() to call the next request handler
		// Passport adds this method to request object. A middleware is allowed to add properties to
		// request and response objects
		if ( req.isAuthenticated() ){
			if( ( req.user && req.user.rol == 'admin' ) )
				return next();
			else
				res.status(403).render('errors/403');
		}
		// if the user is not authenticated then redirect him to the login page
		res.redirect('/auth/login');
	}
};

module.exports = auth;
