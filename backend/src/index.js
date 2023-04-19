import { app } from "./main.js";
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = 3001;

app.listen(PORT, () => {
	console.log("Server is listening...");
});
