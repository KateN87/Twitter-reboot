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
   const poster = req.params.username;
   //const username = "@" + poster;
   const username = poster
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

app.get('/users/:id', (req, res) => {
   const id = +req.params.id 
   const i = users.findIndex((i) => i.id === id)
   if(i >= 0){
      res.status(200).send(users[i])  
    } else{
        res.status(400).send("User not found");
    }
})

app.get('/:username', (req, res) => {
   const username = req.params.username;
   console.log(username)
   let user = {};
   for(let i = 0; i < users.length; i++){
      const dbUsername = users[i].username
      if(dbUsername === username){
         user = users[i]
         //user.push(users[i])
      }
   }
   res.status(200).send(user)
})

export { app };
