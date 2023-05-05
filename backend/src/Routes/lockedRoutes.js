import express from 'express';
import validator from 'validator';
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
    let maxId = Math.max(0,...tweets.map(object => object.id))
    let id = maxId + 1
    const newTweet = {
        id: id,
        username,
        timestamp: date,
        tweet,
        likedBy: [],
        retweets: 0,
        comments: [],
        hashtags,
    };

    tweets.push(newTweet);
    allHashtags.push(...hashtags);

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
export default router;

/*
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

        res.status(201).send('updated');
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
    } */
