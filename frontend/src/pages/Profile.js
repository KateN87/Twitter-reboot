import CreateTweet from "../components/CreateTweet";
import ProfileInformation from "../components/profileInformartion";

import { OwnTweets } from "../components/OwnTweets";


export default function Profile() {
   return (
      <div className=" container">
         <CreateTweet />
         <OwnTweets></OwnTweets>
         <ProfileInformation />
      </div>

   )
}

