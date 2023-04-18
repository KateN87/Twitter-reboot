import { useSelector, useDispatch } from "react-redux"

export default function CreateTweet() {
   const tweet = useSelector(state => state.tweetReducer)
   console.log('', tweet)

   function handleChange(event) {

   }
   function submitMessage() {


   }

   return (
      <div className="tweet-component">
         <h1>tweetReducer: {tweet}</h1>
         <h2>Tweet something here</h2>
         <form onSubmit={submitMessage} className="tweet-form" action="">
            <textarea
               onChange={handleChange}
               id="comment"
               name="comment"
               rows="5"
               maxLength="140"
               placeholder="Write tweet..."></textarea>
            <button type="submit">Tweet</button>
         </form>
      </div>
   )
}

// Character Count
{/* <div id="the-count_comment" style="">
   <p>0/140</p>
</div> */} 