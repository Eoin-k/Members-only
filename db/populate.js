const { Client } = require("pg");
require("dotenv").config();
const passwordUtils = require("../Utilities/passwordUtils");

const SQL = `CREATE TABLE IF NOT EXISTS USERS (user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, email VARCHAR(100), firstname VARCHAR(50), lastname VARCHAR(50), password TEXT NOT NULL,is_admin BOOLEAN DEFAULT FALSE,is_member BOOLEAN DEFAULT FALSE );

CREATE TABLE IF NOT EXISTS messages ( message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, title VARCHAR(100), post_content VARCHAR(2000), added TIMESTAMP DEFAULT CURRENT_TIMESTAMP, user_id INT REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL,
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

INSERT INTO users(email, firstname, lastname, password, is_admin, is_member) VALUES ('mail@mail.com','Johnny','Rotten', '123',true, true), ('gmail@gmail.com', 'Tom', 'Timson', '123',false, true);

INSERT INTO messages (title, post_content, user_id) 
VALUES 
('A Surprise Picnic in the Park!', 'Today, I decided to surprise my best friend with a picnic in the park. We packed sandwiches, fruit, and lemonade, and headed to our favorite spot under a big oak tree. The weather was perfect—sunny with a light breeze. We spent hours chatting, laughing, and even flew a kite we found in the trunk of my car. It was such a simple plan, but it reminded me how happiness can be found in the smallest moments. Sometimes, the best days are the ones that arent planned at all! Lifes little surprises are truly the sweetest.', 1),
('Celebrating Milestones, Big and Small', 'This week, I celebrated my little sisters first piano recital, and it was a moment I will never forget. She was so nervous, but as soon as her fingers touched the keys, the most beautiful melody filled the room. It made me realize how important it is to celebrate every milestone, whether big or small. It is these moments that fill our lives with meaning and joy. Whether it is an achievement like finishing a project or simply making time for a hobby, every victory counts. I could not be prouder of her, and it is reminded me to embrace every joyful milestone in life!', 1),
('The Joy of Random Acts of Kindness', 'Today, something amazing happened. I was standing in line at my favorite coffee shop when the person in front of me paid for my order. I was so surprised and touched by this simple act of kindness. It made my entire morning. I decided to pay it forward, buying a coffee for the person behind me. The look of gratitude on their face was priceless, and I could feel the ripple of joy spreading through the room. As I walked out of the shop, I thought about how these small, random acts of kindness can have such a huge impact on our day-to-day lives. We live in a fast-paced world where it is easy to get caught up in our routines, but moments like this remind us of the power of human connection. So, I have made a new goal for myself: every week, I want to do something kind for someone, whether they expect it or not. It could be something as simple as holding the door for someone, offering a compliment, or even paying for a strangers coffee. What Ive learned is that kindness does not need to be grand or complicated. Sometimes, it is the simplest gestures that mean the most. This little coffee shop experience brightened my day in ways I had not anticipated, and it is inspired me to keep spreading that joy. A little kindness goes a long way, and in return, it leaves both the giver and the receiver feeling uplifted. Happiness really is contagious!', 2),
('Reconnecting with Old Friends', 'I reconnected with an old friend today, and it felt like no time had passed at all. We met for brunch, and as we caught up on each others lives, we laughed about old memories and shared our hopes for the future. It reminded me how valuable true friendships are—they may go dormant for a while, but the connection remains strong. It was a day filled with laughter, warmth, and nostalgia. Sometimes, life gets busy, but days like today remind me to cherish those who have been part of our lives, no matter how much time has passed.', 1),
('A Blooming Garden of Positivity', 'I have always loved the idea of gardening, but never found the time to really commit to it. This year, I finally decided to start a little garden in my backyard, and it is been the most rewarding experience! At first, I was a little overwhelmed, but I quickly realized how therapeutic and joyful it could be. Watching those tiny seeds sprout into beautiful flowers and vegetables has filled my days with so much positivity. Each morning, I walk outside with my cup of coffee and tend to my plants. It is become my favorite part of the day, and I have even noticed how much calmer and happier I feel afterward. There is something so fulfilling about nurturing something from the ground up and watching it grow and thrive. It is a reminder of how much beauty can come from patience, care, and a little love. Even better, my garden has become a little oasis for friends and family to enjoy. Last weekend, I hosted a garden party where we all gathered around the flowers, shared stories, and enjoyed fresh veggies from the garden. The air was filled with laughter, and everyone marveled at the beauty of the blooming flowers around us. It is amazing how something as simple as planting a few seeds can transform your life in such a meaningful way. If you have ever considered starting a garden, I encourage you to go for it! It is more than just growing plants—it is about cultivating happiness, mindfulness, and a sense of accomplishment. My garden has become my happy place, and I hope yours can too!', 2);
`;

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
