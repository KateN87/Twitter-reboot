import { useSelector, useDispatch } from "react-redux"



export default function CreateTweet() {
   const dispatch = useDispatch()
   const tweets = useSelector(state => state.tweetReducer)

   function submitTweet(event) {
      event.preventDefault()
      const textInput = event.target.tweet.value;
      console.log('text input: ', textInput)

      // fetch från backend och vänta på svar och skicka sedan in svaret

      dispatch({ type: 'SEND_TWEET', payload: textInput });
      console.log('tweets: ', tweets);

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
{/* <div id="the-count_comment" style="">
   <p>0/140</p>
</div> */} 