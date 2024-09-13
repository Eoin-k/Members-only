const db = require("../db/queries");
showHome = async (req, res) => {
	try {
		const messages = await db.getAllMessages();
		await res.render("index", {
			user: req.user,
			messages: messages,
		});
	} catch (err) {
		console.error(err);
	}
};

createMessage = async (req, res) => {
	try {
		console.log(`Post Title: ${req.body.title}
			Post Content: ${req.body.post_content}
			User: ${req.user.firstname}
			ID: ${req.user.user_id}`);
		res.redirect("/");
	} catch (err) {}
};

module.exports = {
	showHome,
	createMessage,
};
