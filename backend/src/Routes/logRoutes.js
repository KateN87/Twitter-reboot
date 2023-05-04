import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fileUpload from 'express-fileupload';
import { db } from '../database.js';
import validateSignup from '../../validate/validateSignup.js';

const router = express.Router();

//Middleware for handling uploaded files
router.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '1d' });
};

router.post('/signup', async (req, res) => {
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
        //Validates info
        validateSignup(req);
        //Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const id = db.data.users.length + 1;
        let image = {};
        //Gets image-objekt from req.files(by middleware)

        if (req.files === null) {
            //If no image, set default image
            image.name = 'default-user-avatar.png';
        } else {
            image = req.files.image;
            if (
                image.mimetype !== 'image/jpeg' &&
                image.mimetype !== 'image/jpg' &&
                image.mimetype !== 'image/png'
            ) {
                throw Error('Image must be in format .jpeg/.jpg or .png');
            }
            //If uploaded image, place in upload-folder and the name from image-object
            image.mv('public/images/' + image.name);
        }

        const user = {
            id,
            username: `@${username}`,
            password: hash,
            avatar: image.name,
            email,
            nickname,
            following: [],
            followers: 0,
            about,
            occupation,
            hometown,
            website,
            joined: new Date(),
        };

        //add user to db
        db.data.users.push(user);
        await db.write();
        const token = createToken(id);

        res.status(200).json({ ...user, token });
    } catch (error) {
<<<<<<< HEAD
        console.log("THIS IS ERROR", error);
=======
>>>>>>> bb2e44709fc4c75cbdbb1d10e1723da7d884be05
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
