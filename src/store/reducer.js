import * as actions from './actions';

const initialState = {
    // JWT: null,
    JWT:'something',
    keyword: '',
    yearFrom: 0,
    yearTo: 2019,
    writtenBy: '',
    publications:[],
    authors:[]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LOGIN:
            return {
                ...state,
                JWT: action.JWT,
            };
        case actions.LOGOUT:
            return {
                ...state,
                JWT: null,
            };
        case actions.SETKEYWORD:
            return {
                ...state,
                keyword: action.keyword,
            };
        case actions.SETWRITTENBY:
            return {
                ...state,
                writtenBy: action.writtenBy,
            };
        case actions.SETYEARFROM:
            const yearFrom = action.yearFrom === '' ? 0 : Number(action.yearFrom);
            return {
                ...state,
                yearFrom: yearFrom
            };
        case actions.SETYEARTO:
            const yearTo = action.yearTo === '' ? 2018 : Number(action.yearTo);
            return {
                ...state,
                yearTo: yearTo
            };
        case actions.SETPUBLICATIONS:
            return{
                ...state,
                publications:action.publications
            };
        default:
            return state;
    }
};

export default reducer;