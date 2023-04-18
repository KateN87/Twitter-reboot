import express from "express";
import validator from "validator";

import { users } from "../database.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
	const { username, password } = req.body;

	//checks if userName and password is put in
	if (!username || !password) {
		res.send("Please fill in username and password");
	}

	//checks if userName already exists
	const exists = users.find((user) => username === user.username);

	if (exists) {
		res.send("User name already taken");
	}

	if (!validator.isStrongPassword(password)) {
		res.send(
			"Password needs to be at least 8 characters and contain lower case, upper case, number and special character"
		);
	}
});

/* signup = async function (userName, password) {

    //check if userName already exists
    const exists = await this.findOne({ userName });

    if (exists) {
        throw Error('User name already in use');
    }

    //Chcecks if password is strong enough
    if (!validator.isStrongPassword(password)) {
        throw Error(
            'Password not strong enough. Needs to be at least 8 characters and contain lower case, upper case, number and special character'
        );
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ userName, password: hash });

    return user;
}; */

export default router;
