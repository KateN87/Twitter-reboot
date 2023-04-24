import express from 'express';

import requireAuth from '../middleware/authorization.js';
import { db, users, tweets } from '../database.js';

const router = express.Router();

router.use(requireAuth);

router.get('/test', (req, res) => {
    res.status(200).send(req.user);
});

// POST skapa ny tweet
router.post('/tweets', async (req, res) => {
    console.log('req user: ', req.user);

    //TODO
    // Kolla att det inte är en tom sträng

    const { username, tweet } = req.body;
    const date = new Date();

    const newTweet = {
        username,
        timestamp: date,
        tweet,
        likes: 0,
        retweets: 0,
        comments: [],
    };

    tweets.push(newTweet);

    await db.write();
    res.status(200).send(newTweet);
});

router.get('/followtweet', (req, res) => {
    const following = req.user.following;
    const tweetList = [];
    try {
        following.forEach((user) =>
            tweetList.push(tweets.filter((tweet) => tweet.username === user))
        );

        res.status(200).send(tweetList);
    } catch (error) {
        res.send(res.status(401).json({ error: error.message }));
    }
});

export default router;
