const tweetReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_TWEETS':
            return action.payload;
        case 'SEND_TWEET':
            /* return [action.payload, ...state]; */
            return [action.payload, ...state];
        default:
            return state;
    }
};

export default tweetReducer;
