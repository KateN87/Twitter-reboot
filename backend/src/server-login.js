const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'mysecretkey';

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


