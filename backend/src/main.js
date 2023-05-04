import express from 'express';
import cors from 'cors';

import { db, users, tweets, allHashtags } from './database.js';
import User from './models/userModel.js'
import logRoutes from './Routes/logRoutes.js';
import lockedRoutes from './Routes/lockedRoutes.js';

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
   const users = await User.find({ username: '@Matilda' })
   res.send(users);
});

app.get('/tweets', (req, res) => {
   let tweetslist = [];
   for (let i = 0; i < tweets.length; i++) {
      let tweet = tweets[i];
      tweetslist.push(tweet);
   }
   res.send(tweetslist);
});

app.get('/tweets/:user', (req, res) => {
   const poster = req.params.user;
   try {
      const user = users.find(
         (u) => u.username === poster || u.id === Number(poster)
      );
      if (!user) {
         throw Error('No user with that name/id');
      }
      let newTweets = [];
      for (let i = 0; i < tweets.length; i++) {
         let tweet = tweets[i];
         const tweetUser = tweet.username;
         if (tweetUser === user.username) {
            newTweets.push(tweet);
         }
      }
      res.send(newTweets);
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

app.get('/trending', (req, res) => {
   const occuringHashtags = {};
   try {
      //Iterate over each tweet
      for (const tweet of tweets) {
         //Iterate over each hashtag in hashtag-array
         for (const hashtag of tweet.hashtags) {
            //If the hashtag is already in occuringHashtags, add one to the count
            if (occuringHashtags.hasOwnProperty(hashtag.toLowerCase())) {
               occuringHashtags[hashtag.toLowerCase()]++;
            } else {
               //If the hashtag is already there, add the hashtag and set it to one
               occuringHashtags[hashtag.toLowerCase()] = 1;
            }
         }
      }
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
      occuringHashtagsArray.sort((a, b) => b[1] - a[1]);
      const topFive = occuringHashtagsArray.slice(0, 5);
      res.status(200).send(topFive);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

//kollar id:et på användaren med det användarnamnet
/* app.get('/:username', (req, res) => {
    const username = req.params.username;
    let user = users.find((u) => u.username === username);

    /* for (let i = 0; i < users.length; i++) {
      const dbUsername = users[i].username
      if (dbUsername === username) {
         user = users[i]
         lastId = users[i].id
      }
   } */

/* res.status(200).send(user);
}); */
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
