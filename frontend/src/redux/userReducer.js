const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.payload;
        case 'LOGOUT_USER':
            return null;
        case 'ADD_FOLLOWING':
            return {
                ...state,
                following: [...state.following, action.payload],
            };
        case 'DELETE_FOLLOWING':
            return {
                ...state,
                following: state.following.filter((u) => u !== action.payload),
            };
        case 'NO_USER':
            return null;
        default:
            return state;
    }
};

export default userReducer;
