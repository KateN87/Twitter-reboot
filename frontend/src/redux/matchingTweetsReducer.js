const matchingTweetsReducer = (state = [], action) => {
   switch (action.type) {
      case "SET_MATCHING_TWEETS":
         return action.payload;
      default:
         return state;
   }
};

export default matchingTweetsReducer;