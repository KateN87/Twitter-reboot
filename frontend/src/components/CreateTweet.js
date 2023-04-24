import { useSelector, useDispatch } from "react-redux"

export default function CreateTweet() {
   const dispatch = useDispatch()
   const tweets = useSelector(state => state.tweetReducer)

   async function submitTweet(event) {
      event.preventDefault();

      const textInput = event.target.tweet.value;

      const checkUser = JSON.parse(localStorage.getItem("user"));
      console.log('username: ', checkUser.username)

      if (!checkUser) {
         console.log("User not authenticated");
         return;
      }

      const newTweet = {
         tweet: textInput,
         username: checkUser.username
      };

      const options = {
         method: 'POST',
         body: JSON.stringify(newTweet),
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${checkUser.token}`
         }
      };

      try {
         const response = await fetch('http://localhost:3001/locked/tweets', options);
         if (!response.ok) {
            throw new Error('Failed to send tweet');
         }
         const data = await response.json();
         dispatch({ type: 'SEND_TWEET', payload: data });
      } catch (error) {
         console.error(error);
      }
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


