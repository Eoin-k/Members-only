const { Pool } = require("pg");
const pool = new Pool({
	host: process.env.host,
	user: process.env.user,
	database: process.env.database,
	password: process.env.password,
	port: process.env.dbport,
});
