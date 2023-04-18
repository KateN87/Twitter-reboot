import { useSelector } from "react-redux"

export default function CreateTweet() {



   return (
      <div className="tweet-component">
         <h2>Tweet something here</h2>
         <form className="tweet-form" action="">
            <textarea id="comment" name="comment" rows="5" maxLength="140" placeholder="Write tweet..."></textarea>
            <button type="submit">Tweet</button>
         </form>
      </div>
   )
}

// Character Count
{/* <div id="the-count_comment" style="">
   <p>0/140</p>
</div> */} 