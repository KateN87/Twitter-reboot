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

let lastId

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
   if (i >= 0) {
      res.status(200).send(users[i])
   } else {
      res.status(400).send("User not found");
   }
})

//kollar id:et på användaren med det användarnamnet
app.get('/:username', (req, res) => {
   const username = req.params.username;
   let user = {};
   for (let i = 0; i < users.length; i++) {
      const dbUsername = users[i].username
      if (dbUsername === username) {
         user = users[i]
         lastId = users[i].id
      }
   }

   res.status(200).send(user)
})

app.get('/users/:id/:username', (req, res) => {
   const id = +req.params.id
   const username = req.params.username
   console.log(username)
   const i = users.findIndex((i) => i.id === id)
   const followList = users[i].following
   if(followList.includes(username)){
      res.sendStatus(200)
   } else {
      res.sendStatus(404)
   }
})

app.post('/users/:id', async (req, res) => {
   const id = +req.params.id;
   const i = users.findIndex((i) => i.id === id)
   const username = "@" + req.body.username
   let following = users[i].following
   let found = following.includes(username)

   if (i != undefined && !found) {
      let followlist = users[i].following
      followlist.push(username)

      for (let index = 0; index < users.length; index++) {
         if (users[index].username === username) {
            let followers = users[index].followers
            users[index].followers += 1
            console.log(followers)
            await db.write()
            return followers
         }
         await db.write()
      }

      res.status(201).send("Updated!")

   } else if (found) {
      let followList = users[i].following
      let found = followList.indexOf(username)

      followList.splice(found, 1)
      for (let index = 0; index < users.length; index++) {
         if (users[index].username === username) {
            let followers = users[index].followers
            users[index].followers -= 1
            console.log(followers)
            await db.write()
            return followers
         }
      }
      await db.write()
   } else {
      res.status(400).send("Bad request")
   }
})

export { app };
