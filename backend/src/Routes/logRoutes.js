import express from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { db } from '../database.js';

const router = express.Router();

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '1d' });
};

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        //checks if userName and password is put in
        if (!username || !password) {
            throw Error('Please fill in username and password');
        }

        //checks if userName already exists
        const maybeUser = db.data.users.find(
            (user) => username === user.username
        );

        if (maybeUser) {
            throw Error('User name already taken');
        }

        //checks if password is strong enough
        if (!validator.isStrongPassword(password)) {
            throw Error(
                'Password needs to be at least 8 characters and contain lower case, upper case, number and special character'
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const id = db.data.users.length + 1;
        console.log(id);

        const newUser = {
            id,
            username,
            password: hash,
            avatar: 'https://i.postimg.cc/4xw9qHxk/avatar.png',
        };

        db.data.users.push(newUser);
        await db.write();
        const token = createToken(id);

        res.status(200).json({ username, token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // kolllar om användare existerar 
        const user = db.data.users.find((u) => u.username === username);
        if (!user) throw Error('User not found');

        // kollar om lösenordet stämmer check 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw Error('Invalid password');


        const token = createToken(user.id);
        res.status(200).json({ username: user.username, token });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
});

export default router;
