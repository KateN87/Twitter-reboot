import express from 'express';
import validator from 'validator';
import requireAuth from '../middleware/authorization.js';
import { db, users, tweets, allHashtags } from '../database.js';

import Tweet from '../models/tweetModel.js';
import User from '../models/userModel.js';

const router = express.Router();

router.use(requireAuth);

router.get('/test', (req, res) => {
    res.status(200).send(req.user);
});

// POST skapa ny tweet
router.post('/tweets', async (req, res) => {
    // Validate tweet
    const { tweet } = req.body;

    if (!tweet || tweet.length > 140) {
        res.status(400).send(
            'Tweet cannot be empty or more than 140 characters'
        );
        return;
    }

    const newTweet = new Tweet({
        username: req.body.username,
        tweet: req.body.tweet,
        hashtags: req.body.hashtags,
    });

    try {
        const savedTweet = await newTweet.save({ timestamp: true });
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
    const loggedInUsername = req.user.username;
    console.log(loggedInUsername);
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

router.patch('/editprofile', async (req, res) => {
    const userId = req.user.id;
    const { email, nickname, about, occupation, hometown, website } = req.body;
    const userToEditIndex = users.findIndex((u) => u.id === userId);

    try {
        if (
            !email ||
            !nickname ||
            !about ||
            !occupation ||
            !hometown ||
            !website
        ) {
            throw Error('All fields must be filled');
        }
        if (!validator.isEmail(email)) {
            throw Error('Please enter a valid email address');
        }
        if (userToEditIndex === -1) {
            throw Error('User not found');
        }
        const userToEdit = users.find((user) => user.id === userId);
        const updatedUser = {
            ...userToEdit,
            email: email,
            nickname: nickname,
            about: about,
            occupation: occupation,
            hometown: hometown,
            website: website,
        };

        users[userToEditIndex] = updatedUser;
        await db.write();
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.patch('/liketweet/:id', async (req, res) => {
    const id = req.params.id;
    const username = req.user.username;
    const tweetToLike = await Tweet.findById(id);
    const { likes } = tweetToLike;
    const isLikedIndex = likes.indexOf(username);

    if (isLikedIndex === -1) {
        const updatedLikeList = [...likes, username];
        await Tweet.findOneAndUpdate(
            { _id: id },
            { likes: updatedLikeList },
            { new: true }
        );

        return res.status(201).json(tweetToLike);
    }

    await Tweet.findOneAndUpdate(
        { _id: id },
        { $pull: { likes: username } },
        { new: true }
    );

    console.log(isLikedIndex);
    return res.status(200).json(tweetToLike);
});
export default router;
