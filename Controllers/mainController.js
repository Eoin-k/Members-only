const db = require("../db/queries");
showHome = async (req, res) => {
	try {
		const messages = await db.getAllMessages();
		if (req.session.viewCount) {
			req.session.viewCount++;
		} else {
			req.session.viewCount = 1;
		}
		await res.render("index", {
			user: req.user,
			messages: messages,
		});
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	showHome,
};
