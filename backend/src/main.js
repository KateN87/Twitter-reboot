import express from "express";

import { db } from "./database.js";

import logRoutes from "./Routes/logRoutes.js";

import cors from 'cors'

app.use(cors({
    origin: "http://localhost:3000"
}))

const app = express();


app.use(express.json());

app.use("/log", logRoutes);

app.get("/users", (req, res) => {
	res.send(db.data.users);
});

export { app };
