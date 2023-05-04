import { app } from "./main.js";
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = 3001;

try {
   await mongoose.connect(process.env.MONGO_URI);
   app.listen(PORT, () => {
      console.log("Server is listening...");
   });
} catch (error) {
   console.log(error)
}