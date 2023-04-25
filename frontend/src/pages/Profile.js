import { default as ProfileInformation } from "../components/ProfileInformation.js";

import { OwnTweets } from "../components/OwnTweets";


export default function Profile({id, setId}) {

   return (
      <div className=' container'>
         <OwnTweets id={id}></OwnTweets>
         <ProfileInformation id={id} setId={setId} />
      </div>
   );
}
