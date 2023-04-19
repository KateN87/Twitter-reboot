import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { db, users, tweets } from './database.js';
import logRoutes from './Routes/logRoutes.js';

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

//Routes
app.post('/login', (req, res) => {
   const { username, password } = req.body;


   if (username === 'myusername' && password === 'mypassword') {

      const token = jwt.sign({ username, password }, SECRET_KEY);

      // spara token i local storage 
      res.send({ token });
   } else {
      res.status(401).send({ error: 'Invalid username or password' });
   }
});

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

export { app };
