import { useSelector, useDispatch } from "react-redux"



export default function CreateTweet() {
   const dispatch = useDispatch()
   const tweets = useSelector(state => state.tweetReducer)

   function submitTweet(event) {
      event.preventDefault()

      dispatch({ type: 'SEND_TWEET', payload: event.target.value });
      console.log(tweets.getState());


   }
   function handleTextInputChange(event) {
      const textInput = event.target.value;
      console.log('text input: ', textInput)

   }

   return (
      <div className="tweet-component">
         <h2>Tweet something here</h2>
         <form onSubmit={submitTweet} className="tweet-form" action="">
            <textarea
               onChange={handleTextInputChange}
               id="tweet"
               name="tweet"
               rows="5"
               maxLength="140"
               placeholder="Write tweet..."
               value={tweets.text}>
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