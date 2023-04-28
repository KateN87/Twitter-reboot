import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();

const users = db.data.users;
const tweets = db.data.tweets;
const allHashtags = db.data.allHashtags;

export { db, users, tweets, allHashtags };
