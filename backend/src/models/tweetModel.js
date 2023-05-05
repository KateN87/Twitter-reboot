import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tweetSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
      },
      tweet: {
         type: String,
         required: true,
      },
      likes: {
         type: Array,
         required: true,
      },
      hashtags: {
         type: Array,
         required: true,
      },
   },
   { timestamps: true }
)

const Tweet = mongoose.model('Tweet', tweetSchema)

export default Tweet;