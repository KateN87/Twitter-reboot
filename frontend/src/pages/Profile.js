import ProfileInformation from "../components/porfileInformartion";
import { OwnTweets } from "../components/OwnTweets";

export default function Profile() {
   return (
      <div className=" container">
         <OwnTweets></OwnTweets>
         <ProfileInformation />
      </div>

   )
}

