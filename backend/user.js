var user = {};

user.login = function (req, res) {
	res.send('login:' + req.body.username);
};

module.exports = user;