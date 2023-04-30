import express from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { db } from '../database.js';
import validateSignup from '../../validate/validateSignup.js';

const router = express.Router();

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '1d' });
};

router.post('/signup', async (req, res) => {
    console.log;
    const {
        username,
        password,
        email,
        nickname,
        about,
        occupation,
        hometown,
        website,
    } = req.body;

    try {
        validateSignup(req);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const id = db.data.users.length + 1;

        const user = {
            id,
            username,
            password: hash,
            avatar: 'https://i.postimg.cc/4xw9qHxk/avatar.png',
            email,
            nickname,
            about,
            occupation,
            hometown,
            website,
            joined: new Date(),
        };

        db.data.users.push(user);
        await db.write();
        const token = createToken(id);

        res.status(200).json({ ...user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    let addedUsername = username;
    if (!username.includes('@')) {
        addedUsername = `@${username}`;
    }

    try {
        // kollar om användare existerar
        let user = db.data.users.find(
            (u) => u.username === addedUsername || u.email === addedUsername
        );
        if (!user) throw new Error('User not found');

        // kollar om lösenordet stämmer check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw Error('Invalid password');

        const token = createToken(user.id);
        res.status(200).json({ ...user, token });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
});

export default router;
