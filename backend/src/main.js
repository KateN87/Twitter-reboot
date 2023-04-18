import express from "express";

import { db, users, tweets } from "./database.js";

import logRoutes from "./Routes/logRoutes.js";

import cors from 'cors'

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json());

app.use("/log", logRoutes);

app.get("/users", (req, res) => {
	res.send(db.data.users);
});

app.get('/tweets', (req, res) => {
	let tweetslist = []
	for(let i = 0; i < tweets.length; i++){
		let tweet = tweets[i]
		tweetslist.push(tweet)
	}
	res.send(tweetslist)
})

export { app };
