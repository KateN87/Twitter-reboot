import express from "express";

import { db, users, tweets } from "./database.js";

import logRoutes from "./Routes/logRoutes.js";

import cors from 'cors'

import jwt from 'jwt'

const app = express();
>>>>>>> 686f871db1266cdebfdd6f184474fd84353a9a59
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json());

app.use("/log", logRoutes);


app.post('/login', (req, res) => {
    const { username, password } = req.body;


    if (username === 'myusername' && password === 'mypassword') {

        const token = jwt.sign({ username, password }, SECRET_KEY);

        // spara token i local storage 
        res.send({ token });
    } else {
        res.status(401).send({ error: 'Invalid username or password' });
    }
});



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
