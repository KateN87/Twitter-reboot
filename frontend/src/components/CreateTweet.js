import { useSelector, useDispatch } from "react-redux"

export default function CreateTweet() {
   const dispatch = useDispatch()
   const tweets = useSelector(state => state.tweetReducer)
   console.log(tweets)

   async function submitTweet(event) {
      event.preventDefault();

      const textInput = event.target.tweet.value;

      const newTweet = {
         tweet: textInput,
         username: `Matildis`
      };

      const options = {
         method: 'POST',
         body: JSON.stringify(newTweet),
         headers: {
            'Content-Type': 'application/json'
         }
      };

      const response = await fetch('http://localhost:3001/tweets', options);
      const data = await response.json();

      if (response.status === 200) {
         console.log('it worked ', data);
         dispatch({ type: 'SEND_TWEET', payload: textInput });
      } else {
         console.log('something went wrong');
      }
      console.log('Tweets state: ', tweets)
   }

   return (
      <div className="tweet-component">
         <h2>Tweet something here</h2>
         <form onSubmit={submitTweet} className="tweet-form" action="">
            <textarea
               id="tweet"
               name="tweet"
               rows="5"
               maxLength="140"
               placeholder="Write tweet...">
            </textarea>
            <button type="submit">Tweet</button>
         </form>
      </div>
   )
}

// Character Count
/* <div id="the-count_comment" style="">
   <p>0/140</p>
</div> */
