showLogin = async (req, res) => {
	try {
		res.render("login", {
			user: req.user,
		});
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	showLogin,
};
