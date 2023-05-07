const tweetReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_TWEETS':
            return action.payload;
        case 'SEND_TWEET':
            return [action.payload, ...state];
        case 'CHANGE_LIKE':
            return state.map((tweet) => {
                if (tweet._id === action.payload._id) {
                    return action.payload;
                } else {
                    return tweet;
                }
            });
        default:
            return state;
    }
};

export default tweetReducer;
