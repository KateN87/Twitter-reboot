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
   //TODO 

   // Kolla att det inte är en tom sträng
   const { username, tweet, hashtags } = req.body;
   const date = new Date();

   const newTweet = {
      username,
      timestamp: date,
      tweet,
      likes: 0,
      retweets: 0,
      comments: [],
      hashtags
   };

   tweets.push(newTweet);
   allHashtags.push(...hashtags)

   await db.write();
   console.log('allHasttags: ', allHashtags)
   res.status(200).send(newTweet);
});

export default router;
