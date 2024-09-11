const { Client } = require("pg");
require("dotenv").config();

const SQL = `CREATE TABLE IF NOT EXISTS USERS (user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, firstname VARCHAR(50), lastname VARCHAR(50), password TEXT NOT NULL,is_admin BOOLEAN DEFAULT FALSE,is_member BOOLEAN DEFAULT FALSE );

CREATE TABLE IF NOT EXISTS messages ( message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title VARCHAR(100), post_content VARCHAR(2000), added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL,
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");`;

async function main() {
	console.log("Starting database seeding process");
	const client = new Client({
		connectionString: `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.dbPort}/${process.env.database}`,
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log("Database has been Seeded");
}

main();
