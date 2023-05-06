import express from 'express';
import jwt from 'jsonwebtoken';
import fileUpload from 'express-fileupload';
import User from '../models/userModel.js';

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

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
};

//KLAR GÄLLANDE MONGODB
router.post('/signup', async (req, res) => {
    const {
        username,
        password,
        verifyPass,
        email,
        nickname,
        about,
        occupation,
        hometown,
        website,
    } = req.body;

    try {
        let image = {};
        console.log(req.files);
        //Gets image-objekt from req.files(by middleware)

        if (req.files === undefined) {
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

        const newUser = {
            username: `@${username}`,
            password,
            verifyPass,
            avatar: image.name,
            email,
            nickname,
            about,
            occupation,
            hometown,
            website,
        };

        //add user to db
        const user = await User.signup(newUser);
        const token = createToken(user._id);
        res.status(200).json({ user, token });
    } catch (error) {
        console.log('THIS IS ERROR', error);
        res.status(400).json({ error: error.message });
    }
});

//KLAR GÄLLANDE MONGODB
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    let addedUsername = username;
    if (!username.includes('@')) {
        addedUsername = `@${username}`;
    }

    try {
        const user = await User.login(addedUsername, password);
        const token = createToken(user._id);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
