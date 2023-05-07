import express from 'express';
import validator from 'validator';
import requireAuth from '../middleware/authorization.js';

import Tweet from '../models/tweetModel.js';
import User from '../models/userModel.js';

const router = express.Router();

router.use(requireAuth);

router.get('/test', (req, res) => {
    res.status(200).send(req.user);
});

// POST skapa ny tweet
router.post('/tweets', async (req, res) => {
    const { tweet } = req.body;

    // Validate tweet to be at least one character and maximum 140 characters
    if (!tweet || tweet.length > 140) {
        res.status(400).send(
            'Tweet cannot be empty or more than 140 characters'
        );
        return;
    }
    // Create a new Tweet document with the username, tweet, and hashtags from the request body
    const newTweet = new Tweet({
        username: req.body.username,
        tweet: req.body.tweet,
        hashtags: req.body.hashtags,
    });

    try {
        // Save the new Tweet document to the database and include the timestamp of when it was saved
        const savedTweet = await newTweet.save({ timestamp: true });
        // Return the saved Tweet document in the response
        res.status(200).send(savedTweet);
    } catch (error) {
        // If there is an error saving the Tweet document to the database, log the error and send a 500 status code
        console.error(error);
        res.status(500).send('Error saving tweet to database');
    }
});

router.get('/followtweet', async (req, res) => {
    const following = req.user.following;
    try {
        const tweetList = await Tweet.find({ username: [...following] });
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

        const updatedUser = {
            email: email,
            nickname: nickname,
            about: about,
            occupation: occupation,
            hometown: hometown,
            website: website,
        };

        const userToUpdate = await User.findOneAndUpdate(
            { _id: userId },
            { $set: updatedUser },
            { new: true }
        );

        if (!userToUpdate) {
            throw Error('User not found');
        }

        res.status(200).send(userToUpdate);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.patch('/liketweet/:id', async (req, res) => {
    const id = req.params.id;
    const username = req.user.username;
    const tweetToLike = await Tweet.findById(id);
    const { likedBy } = tweetToLike;
    console.log(likedBy);
    const isLikedIndex = likedBy.indexOf(username);
    if (isLikedIndex === -1) {
        const updatedLikeList = [...likedBy, username];
        const updatedTweet = await Tweet.findOneAndUpdate(
            { _id: id },
            { likedBy: updatedLikeList },
            { new: true }
        );
        console.log(tweetToLike);
        return res.status(201).json(updatedTweet);
    }

    const updatedTweet = await Tweet.findOneAndUpdate(
        { _id: id },
        { $pull: { likedBy: username } },
        { new: true }
    );

    console.log(tweetToLike);
    return res.status(200).json(updatedTweet);
});
export default router;
