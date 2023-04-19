import validator from "validator";
import { db } from "../src/database.js";

const validateSignup = (req) => {
	const {
		username,
		password,
		/* 		verifyPass,
		email,
		nickname,
		about,
		occupation,
		hometown,
		website, */
	} = req.body;
	//checks if userName and password is put in
	if (!username || !password) {
		return Error("All fields must be filled");
	}

	/* 		if (password !== verifyPass) {
			return Error("Password does not match");
		} */

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
	return;
};

export default validateSignup;
