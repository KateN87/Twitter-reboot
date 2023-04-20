import { useSelector, useDispatch } from "react-redux"

export default function CreateTweet() {
   const dispatch = useDispatch()
   const tweets = useSelector(state => state.tweetReducer)
   console.log(tweets)

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

      const response = await fetch('http://localhost:3001/locked/tweets', options);
      const data = await response.json();



      if (response.status === 200) {
         dispatch({ type: 'SEND_TWEET', payload: data });
      } else {
         console.log('something went wrong');
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


