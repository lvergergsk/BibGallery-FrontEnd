import * as actions from './actions';

const initialState = {
    JWT: null
};

const reducer= (state = initialState, action) => {
    switch (action.type) {
        case actions.LOGIN:
            return {
                ...state,
                JWT: action.JWT
            };
        case actions.LOGOUT:
            return {
                ...state,
                JWT: null
            };
        default:
            return state;
    }
};

export default reducer;