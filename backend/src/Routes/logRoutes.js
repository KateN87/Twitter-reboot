import express from "express";
import validator from "validator";
import bcrypt from "bcrypt";

import { db } from "../database.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
	const { username, password } = req.body;
	try {
		//checks if userName and password is put in
		if (!username || !password) {
			throw Error("Please fill in username and password");
		}

		//checks if userName already exists
		const maybeUser = db.data.users.find((user) => username === user.username);

		if (maybeUser) {
			throw Error("User name already taken");
		}

		//checks if password is strong enough
		if (!validator.isStrongPassword(password)) {
			throw Error(
				"Password needs to be at least 8 characters and contain lower case, upper case, number and special character"
			);
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		const id = db.data.users.length + 1;
		console.log(id);

		const newUser = { id, username, password: hash, tweets: [] };

		db.data.users.push(newUser);
		db.write();

		res.status(200).json({ username });
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: error.message });
	}
});

export default router;
