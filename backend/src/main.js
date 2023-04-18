import express from "express";

import { users } from "./database.js";

import logRoutes from "./Routes/logRoutes.js";

const app = express();

app.use(express.json());

app.use("/log", logRoutes);

app.get("/users", (req, res) => {
	res.send(users);
});

export { app };
