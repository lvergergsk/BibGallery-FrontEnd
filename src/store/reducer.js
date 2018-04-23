import * as actions from './actions';

const initialState = {
    // JWT: null,
    JWT: 'something',
    publications: [],
    publicationSearch: {
        type: 'pub',
        pubtype: ['incollection', 'book', 'inproceeding', 'proceeding', 'article'],
        params: {
            offset: 0,
            num: 20
        },
        order: {
            type: "year",
            order: "ASC"
        }
    },
    authors: [],
    publicationsHasMore: true,

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
            if (action.keyword === '') delete state.publicationSearch.params.title;
            else state.publicationSearch.params.title = action.keyword;
            return {
                ...state,
            };
        case actions.SETWRITTENBY:
            state.publicationSearch.params.person = action.writtenBy;
            return {
                ...state,
            };
        case actions.SETYEARFROM:
            if (action.yearFrom === '') delete state.publicationSearch.params.yearbegin;
            else state.publicationSearch.params.yearbegin = action.yearFrom;
            return {
                ...state,
            };
        case actions.SETYEARTO:
            if (action.yearTo === '') delete state.publicationSearch.params.yearto;
            else state.publicationSearch.params.yearto = action.yearTo;
            return {
                ...state,
            };
        case actions.SETPUBLICATIONS:
            state.publicationsHasMore=true;
            state.publications = action.publications.sort(function (a, b) {
                return a.RN - b.RN
            });
            console.log(state.publications)
            return {
                ...state,
            };
        case actions.CONCATPUBLICATIONS:
            if (action.publications.length === 0) state.publicationsHasMore = false;
            else {
                state.publications = state.publications.concat(action.publications).sort(function (a, b) {
                    return a.RN - b.RN
                });
            }
            return {
                ...state,
            };
        case actions.NEXTPUBLICATIONLOAD:
            state.currentPublicationSearch.params.offset += state.currentPublicationSearch.params.num;
            return {
                ...state,
            };
        case actions.RESETPUBLICATIONOFFSET:
            state.publicationSearch.params.offset = 0;
            return {
                ...state,
            };
        case actions.RESETPUBLICATIONS:
            return {
                ...state,
                publications: [],
            };
        case actions.SETPUBLICATIONTYPE:
            state.publicationSearch.pubtype = action.publicationType;
            return {
                ...state
            };
        case actions.SAVECURRENTPUBLICATIONSEARCH:
            console.log(state.publicationSearch);
            return {
                ...state,
                currentPublicationSearch: JSON.parse(JSON.stringify(state.publicationSearch)),
            };
        case actions.SETPUBLICATIONORDER:
            state.publicationSearch.order = action.order;
            return {
                ...state,
            };
        case actions.SETDATABASEINFO:
            return {
                ...state,
                databaseInfo: action.databaseInfo
            }
        default:
            return state;
    }
};

export default reducer;