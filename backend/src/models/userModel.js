import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const Schema = mongoose.Schema;

const userSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      avatar: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      nickname: {
         type: String,
         required: true,
      },
      about: {
         type: String,
         required: false,
      },
      following: {
         type: Array,
         required: true,
      },
      followers: {
         type: Array,
         required: true,
      },
      occupation: {
         type: String,
         required: true,
      },
      hometown: {
         type: String,
         required: true,
      },
      website: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

userSchema.statics.signup = async function (newUser) {
   //can not be arrow function since we're using "this"
   const {
      username,
      password,
      verifyPass,
      avatar,
      email,
      nickname,
      about,
      occupation,
      hometown,
      website,
   } = newUser;
   //validation
   if (
      !username ||
      !password ||
      !email ||
      !nickname ||
      !about ||
      !occupation ||
      !hometown ||
      !website
   ) {
      throw Error('All fields must be filled');
   }

   if (password !== verifyPass) {
      throw Error('Password does not match');
   }

   if (!validator.isEmail(email)) {
      throw Error('Email is not valid');
   }

   const maybeExists = await this.findOne({
      $or: [{ username }, { email }],
   }); //"this" refers to the User-model when its being called

   if (maybeExists) {
      throw Error('Email/username already in use');
   }

   if (!validator.isStrongPassword(password)) {
      throw Error(
         'Password not strong enough. Needs minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1'
      );
   }

   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt);
   const user = await this.create({
      username,
      password: hash,
      avatar,
      email,
      avatar,
      nickname,
      about,
      occupation,
      hometown,
      website,
   });

   return user;
};

userSchema.statics.login = async function (username, password) {
   if (!username || !password) {
      throw Error('All fields must be filled');
   }

   //trying to find user in db
   //"this" refers to the User-model when its being called in logRoutes.js
   const user = await this.findOne({
      $or: [{ username }, { email: username }],
   });

   if (!user) {
      throw Error('Incorrect userName');
   }

   //compares password
   const isMatch = await bcrypt.compare(password, user.password);

   if (!isMatch) {
      throw Error('Incorrect password');
   }

   return user;
};

const User = mongoose.model('User', userSchema, 'users');

export default User;
