import express from 'express';

import requireAuth from '../middleware/authorization.js';
import { db, users, tweets, allHashtags } from '../database.js';

import Tweet from '../models/tweetModel.js';

const router = express.Router();

router.use(requireAuth);

router.get('/test', (req, res) => {
    res.status(200).send(req.user);
});

// POST skapa ny tweet
router.post('/tweets', async (req, res) => {
    const date = new Date();
    // Validate tweet
    /* if (!tweet || tweet.length > 140) {
      res.status(400).send(
         'Tweet cannot be empty or more than 140 characters'
      );
      return;
   } */

    const newTweet = new Tweet({
        username: req.body.username,
        tweet: req.body.tweet,
        likes: [],
        hashtags: [],
    });

    try {
        const savedTweet = await newTweet.save();
        res.status(200).send(savedTweet);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving tweet to database');
    }
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
        res.status(401).json({ error: error.message });
    }
});

//DENNA KLAR GÄLLANDE MONGODB
router.patch('/follow', async (req, res) => {
    //Get loggedin-users id från authorization middleware
    const mainId = req.user.id;
    //The name of the person you want to follow
    const followingUsername = req.body.username;
    const followedUserObj = users.find((u) => u.username === followingUsername);
    try {
        let followListUser = users.find((user) => user.id === mainId);

        if (!followListUser) {
            throw Error('User not found');
        }

        // check if logged in user is already following - might not need this
        const isFollowingIndex =
            followListUser.following.indexOf(followingUsername);
        const followersIndex =
            followedUserObj.followers.indexOf(followingUsername);

        if (isFollowingIndex !== -1) {
            followListUser.following.splice(isFollowingIndex, 1);
            followedUserObj.followers.splice(followersIndex, 1);
            await db.write();
            return res.status(200).json(followingUsername);
        }

        // Add requested follow to logged in users following-array
        followListUser.following.push(followingUsername);
        //Add one extra to followers
        followedUserObj.followers.push(req.user.username);
        await db.write();

        res.status(201).json(followingUsername);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
export default router;
