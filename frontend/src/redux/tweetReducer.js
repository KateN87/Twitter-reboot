const tweet = [{ tweet: 'testing' }];

const tweetReducer = (state = tweet, action) => {
   switch (action.type) {
      case 'SEND_TWEET':
         return [...state, { tweet: action.payload }];
      default:
         return state;
   }
}


export default tweetReducer;