import express from "express";
import validator from "validator";
import bcrypt from "bcrypt";

import { db } from "../database.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
	const { username, password } = req.body;

	//checks if userName and password is put in
	if (!username || !password) {
		res.send("Please fill in username and password");
	}

	//checks if userName already exists
	const maybeUser = db.data.users.find((user) => username === user.username);

	if (maybeUser) {
		res.send("User name already taken");
	}

	if (!validator.isStrongPassword(password)) {
		res.send(
			"Password needs to be at least 8 characters and contain lower case, upper case, number and special character"
		);
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const newUser = { username, password: hash };

	db.data.users.push(newUser);
	db.write();

	res.send(newUser);
});

export default router;
