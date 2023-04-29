const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.payload;
        case 'LOGOUT_USER':
            return null;
        case 'ADD_FOLLOWING':
            return [...state.following, action.payload];
        default:
            return state;
    }
};

export default userReducer;
