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
      res.status(400).send("Tweet cannot be empty or more than 140 characters");
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
   allHashtags.push(...hashtags)

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
      res.send(res.status(401).json({ error: error.message }));
   }
});

export default router;
