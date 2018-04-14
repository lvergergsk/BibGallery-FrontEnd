import {combineReducers} from 'redux';
import userReducer from './userInfo-reducer'
import loginStatusReducer from './loginStatus-reducer'

const allReducers = combineReducers({
    user: userReducer,
    loginStatus: loginStatusReducer,
});

export default allReducers;
