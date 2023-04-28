import express from 'express';

import requireAuth from '../middleware/authorization.js';
import { db, users, tweets, allHashtags } from '../database.js';

const router = express.Router();

router.use(requireAuth);

router.get('/test', (req, res) => {
    res.status(200).send(req.user);
});

// POST skapa ny tweet
router.post('/tweets', async (req, res) => {
    const { username, tweet, hashtags } = req.body;
    const date = new Date();

    // Validate tweet
    if (!tweet || tweet.length > 140) {
        res.status(400).send(
            'Tweet cannot be empty or more than 140 characters'
        );
        return;
    }

    const newTweet = {
        username,
        timestamp: date,
        tweet,
        likes: 0,
        retweets: 0,
        comments: [],
        hashtags,
    };

    tweets.push(newTweet);
    allHashtags.push(...hashtags);

    await db.write();
    console.log('allHasttags: ', allHashtags);
    res.status(200).send(newTweet);
});

router.get('/followtweet', (req, res) => {
    const following = req.user.following;
    const tweetList = [];
    try {
        tweetList.push(
            ...tweets.filter((tweet) => following.includes(tweet.username))
        );

        res.status(200).send(tweetList);
    } catch (error) {
        res.send(res.status(401).json({ error: error.message }));
    }
});

app.post('/users/:id', async (req, res) => {
    const id = +req.params.id;
    const i = users.findIndex((i) => i.id === id);
    const username = req.body.username;
    let following = users[i].following;
    let found = following.includes(username);

    if (i != undefined && !found) {
        let followlist = users[i].following;
        followlist.push(username);

        for (let index = 0; index < users.length; index++) {
            if (users[index].username === username) {
                let followers = users[index].followers;
                users[index].followers += 1;
                console.log(followers);
                await db.write();
                return followers;
            }
            await db.write();
        }

        res.status(201).send(username);
    } else if (found) {
        let followList = users[i].following;
        let found = followList.indexOf(username);

        followList.splice(found, 1);
        for (let index = 0; index < users.length; index++) {
            if (users[index].username === username) {
                let followers = users[index].followers;
                users[index].followers -= 1;
                console.log(followers);
                await db.write();
                return followers;
            }
        }
        await db.write();
    } else {
        res.status(400).send('Bad request');
    }
});
export default router;
