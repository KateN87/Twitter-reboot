import express from 'express';

import requireAuth from '../middleware/authorization.js';
import { db, users, tweets, allHashtags } from '../database.js';
import User from '../models/userModel.js';

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

    await db.write();
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
        res.status(401).json({ error: error.message });
    }
});

//DENNA KLAR GÄLLANDE MONGODB
router.patch('/follow', async (req, res) => {
    //Get loggedin-users id från authorization middleware
    const loggedInUsername = req.user.username;

    //The name of the person you want to follow
    const followingUsername = req.body.username;
    /* const followedUserObj = users.find((u) => u.username === followingUsername); */
    try {
        const { following } = await User.findOne({
            username: loggedInUsername,
        });

        // check if logged in user is already following
        const isFollowingIndex = following.indexOf(followingUsername);

        if (isFollowingIndex !== -1) {
            await User.findOneAndUpdate(
                { username: loggedInUsername },
                { $pull: { following: followingUsername } },
                { new: true }
            );
            await User.findOneAndUpdate(
                { username: followingUsername },
                { $pull: { followers: loggedInUsername } },
                { new: true }
            );
            return res.status(200).json(followingUsername);
        }

        // Add requested follow to logged in users following-array
        const updatedList = [...following, followingUsername];

        //Update the user in db
        await User.findOneAndUpdate(
            { username: loggedInUsername },
            { following: updatedList },
            { new: true }
        );
        //Updated followingUsernames followed-list with loggedIn-user
        const { followers } = await User.findOne({
            username: followingUsername,
        });

        const updatedFollowersList = [...followers, loggedInUsername];

        await User.findOneAndUpdate(
            { username: followingUsername },
            { followers: updatedFollowersList },
            { new: true }
        );

        res.status(201).json(followingUsername);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
export default router;
