var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	passportJWT = require("passport-jwt"),
	JWTStrategy   = passportJWT.Strategy,
	ExtractJWT = passportJWT.ExtractJwt,
	conf = require('./conf.js'),
	user = require('./user.js');

passport.use(new LocalStrategy(function (username, password, cb) {
	return user.get(username).then((body) => {
		if (body && body.rows && body.rows.length && body.rows[0].doc.password === conf.hashPassword(password)) {
			delete body.rows[0].doc.password;
			return cb(null, body.rows[0].doc, {message: 'Logged In Successfully'});
		} else {
			return cb({message: 'Incorrect email or password.'});
		}
	}).catch(err => cb(err));
}));

passport.use(new JWTStrategy(
	{
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: conf.token.secret
	},
	function (jwtPayload, cb) {
		if (jwtPayload && jwtPayload.username) {
			return cb(null, jwtPayload);
		}
		return cb({message: "Bad token"});
	}
));
