import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true
      },
      password: {
         type: String,
         required: true
      },
      avatar: {
         type: String,
         required: true
      },
      email: {
         type: String,
         required: true,
         unique: true
      },
      nickname: {
         type: String,
         required: true
      },
      about: {
         type: String,
         required: false
      },
      following: {
         type: Array,
         required: true
      },
      followers: {
         type: Array,
         required: true
      },
      occupation: {
         type: String,
         required: true
      },
      hometown: {
         type: String,
         required: true
      },
      website: {
         type: String,
         required: true
      }
   },
   { timestamp: true }
)

const User = mongoose.model('User', userSchema, 'users');

export default User;