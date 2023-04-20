import express from 'express';
import cors from 'cors';

import { db, users, tweets } from './database.js';
import logRoutes from './Routes/logRoutes.js';
import lockedRoutes from './Routes/lockedRoutes.js';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/log', logRoutes);
app.use('/locked', lockedRoutes);

//Routes

app.get('/users', (req, res) => {
    res.send(db.data.users);
});

app.get('/tweets', (req, res) => {
    let tweetslist = [];
    for (let i = 0; i < tweets.length; i++) {
        let tweet = tweets[i];
        tweetslist.push(tweet);
    }
    res.send(tweetslist);
});

// POST skapa ny tweet
app.post('/tweets', async (req, res) => {
    const { username, tweet } = req.body;
    const date = new Date();

    tweets.push({
        username,
        timestamp: date,
        tweet,
        likes: 0,
        retweets: 0,
        comments: [],
    });

    await db.write();
    res.status(200).send(tweets);
});

export { app };
