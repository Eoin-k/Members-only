showHome = async (req, res) => {
	try {
		await res.render("index", {
			user: false,
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	showHome,
};
