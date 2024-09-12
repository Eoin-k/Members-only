const db = require("../db/queries");
showLogin = async (req, res) => {
	try {
		res.render("login");
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	showLogin,
};
