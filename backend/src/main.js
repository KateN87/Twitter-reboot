import express from 'express';
import cors from 'cors';

import { db, users, tweets } from './database.js';
import logRoutes from './Routes/logRoutes.js';
import lockedRoutes from './Routes/lockedRoutes.js';

const app = express();

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

app.get('/users', (req, res) => {
   res.send(db.data.users);
});

app.get('/tweets', (req, res) => {
   let tweetslist = [];
   for (let i = 0; i < tweets.length; i++) {
      let tweet = tweets[i];
      tweetslist.push(tweet);
   }
   res.send(tweetslist);
});

app.get('/tweets/:username', (req, res) => {
   const poster= req.params.username;
   const username = "@" + poster;
   let newTweets = []
   for (let i = 0; i < tweets.length; i++) {
      let tweet = tweets[i]
      const tweetUser = tweet.username
      if (tweetUser === username) {
         newTweets.push(tweet)
      }
   }
   res.send(newTweets)
})

export { app };
