const initialState = {
    auth: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                auth: true
            };
        case 'LOGOUT':
            return {
                ...state,
                auth: false
            };
        default:
            return state;
    }
};

export default reducer;