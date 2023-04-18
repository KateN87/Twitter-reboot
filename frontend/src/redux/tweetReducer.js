const tweets = [
   {
      tweet: 'hi followers',
      timestamp: '14:39'
   }]

const tweetReducer = (state = tweets, action) => {
   switch (action.type) {
      case 'SEND_TWEET':
         return [...state, { tweet: action.payload }];
      default:
         return state;
   }
}


export default tweetReducer;