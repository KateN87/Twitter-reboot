import express from 'express';
import cors from 'cors';

import { users, tweets } from './database.js';
import User from './models/userModel.js';
import Tweets from './models/tweetModel.js';
import logRoutes from './Routes/logRoutes.js';
import lockedRoutes from './Routes/lockedRoutes.js';
import Tweet from './models/tweetModel.js';

const app = express();
app.use(express.static('public'));
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

app.get('/users', async (req, res) => {
   const users = await User.find({});
   res.send(users);
});

app.get('/tweets', async (req, res) => {
   const tweets = await Tweets.find({});
   res.send(tweets);
});

app.get('/tweets/:user', async (req, res) => {
   const poster = req.params.user;

   try {
      const user = await User.findOne({ $or: [{ username: poster }, { id: poster }] })
      if (!user) {
         throw Error('No user with that name/id');
      }
      console.log('user: ', user)
      const tweets = await Tweet.find({ username: user.username })

      console.log('tweets: ', tweets)
      res.send(tweets);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

app.get('/users/:user', (req, res) => {
   const incomingUser = req.params.user;
   //Kollar om den hittar användaren genom användarnamnet eller id:t
   try {
      const user = users.find(
         (u) => u.username === incomingUser || u.id === Number(incomingUser)
      );
      if (user) {
         res.status(200).send(user);
      } else {
         throw Error('User not found');
      }
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

//KLAR GÄLLANDE MONGODB
app.get('/trending', async (req, res) => {
   try {
      const tweets = await Tweet.find();
      const occuringHashtags = {};

      // Iterate over each tweet
      tweets.forEach(function (tweet) {
         // Iterate over each hashtag in hashtag-array
         tweet.hashtags.forEach(function (hashtag) {
            const lowercaseHashtag = hashtag.toLowerCase();
            // If the hashtag is already in occuringHashtags, add one to the count
            if (occuringHashtags.hasOwnProperty(lowercaseHashtag)) {
               occuringHashtags[lowercaseHashtag]++;
            } else {
               // If the hashtag is not there, add the hashtag and set it to one
               occuringHashtags[lowercaseHashtag] = 1;
            }
         });
      });

      // Takes each hashtag from occuringHashtags, and makes it into an array with objects
      const occuringHashtagsArray = Object.keys(occuringHashtags).map(
         (hashtag) => {
            return {
               hashtag: hashtag,
               occurance: occuringHashtags[hashtag],
            };
         }
      );

      //Sort the array based on number, if b[1] is greater than a[1], then b is placed before a
      occuringHashtagsArray.sort((a, b) => b.occurance - a.occurance);
      const topFive = occuringHashtagsArray.slice(0, 5);
      res.status(200).send(topFive);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

app.get('/users/:id/:username', (req, res) => {
   const id = +req.params.id;
   const username = req.params.username;
   console.log(username);
   const i = users.findIndex((i) => i.id === id);
   const followList = users[i].following;
   if (followList.includes(username)) {
      res.sendStatus(200);
   } else {
      res.sendStatus(404);
   }
});

export { app };
