export default function CreateTweet() {

   /* const [tweet, setTweet] = (
      {
         timestamp: "14 Maj 2023",
         tweet: "Första tweeten ever!",
         likes: 0,
         retweets: 0,
         comments: []
      }
   ) */

   return (
      <div className="tweet-component">
         <h2>Tweet something here</h2>
         <form action="">
            <textarea id="comment" name="comment" rows="5" maxLength="140"></textarea>
            {/* <div id="the-count_comment" style="">
               <span id="current_comment">0</span>
               <span id="maximum_comment"> / 500</span>
            </div> */}
            <button type="submit">Tweet</button>
         </form>
      </div>
   )
}

