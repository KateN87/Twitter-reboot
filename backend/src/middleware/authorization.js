import jwt from "jsonwebtoken";
import { db } from "../database.js";

const requireAuth = async (req, res, next) => {
	const { authorization } = req.headers;

	//checks if authorization is sent with header
	if (!authorization) {
		return res.status(401).json({ error: "Authorization-token required" });
	}

	//'Bearer 12312312.495879345.239847928347' only wants whats is after the 'Bearer '
	const token = authorization.split(" ")[1];
	try {
		// gets the user from the database with the id from the token,
		const { id } = jwt.verify(token, process.env.SECRET);
		console.log("THIS IS ID", id);
		//then adds a user-property containing the user-info with that id
		req.user = await db.data.users.find((u) => u.id === id);

		console.log(req.user);
		next();
	} catch (error) {
		/* console.log(error); */
		console.log("NO TOKEN");
		res.status(401).json({ error: "Request is not authorized" });
	}
};

export default requireAuth;
