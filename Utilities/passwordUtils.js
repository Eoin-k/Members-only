const bcrypt = require("bcryptjs");

generatePassword = async (password) => {
	const encryptedPassword = await bcrypt.hash(password, 10);
	return encryptedPassword;
};

checkPassword = async (password, enteredpassword) => {
	bcrypt.compare(password, enteredpassword);
};

module.exports = {
	generatePassword,
	checkPassword,
};
