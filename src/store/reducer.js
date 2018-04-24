import * as actions from './actions';

const initialState = {
    // JWT: null,
    JWT: 'something',
    publications: [],
    authors: [],
    derivedResults: [],
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
    authorSearch: {
        type: "per",
        params: {
            offset: 0,
            num: 20
        },
        order: {
            type: "year",
            order: "DESC"
        }
    },

    publicationsHasMore: true,
    authorsHasMore: true,
    derivedResultsHasMore: true,
    tabNumber: 0,
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
                else {
                    state.publicationSearch.params.title = action.keyword;
                    state.authorSearch.params.person = action.keyword;
                }
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
                state.publicationsHasMore = true;
                state.publicationCount = action.publicationCount;
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
            case actions.NEXTAUTHORLOAD:
                state.currentAuthorSearch.params.offset += state.currentAuthorSearch.params.num;
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
            case actions.RESETAUTHOROFFSET:
                state.authorSearch.params.offset = 0;
                return {
                    ...state,
                };
            case actions.RESETAUTHORS:
                return {
                    ...state,
                    authors: [],
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
            case actions.SAVECURRENTAUTHORSEARCH:
                console.log(state.authorSearch);
                return {
                    ...state,
                    currentAuthorSearch: JSON.parse(JSON.stringify(state.authorSearch))
                }
            case actions.SETPUBLICATIONORDER:
                state.publicationSearch.order = action.order;
                return {
                    ...state,
                };
            case actions.SETDATABASEINFO:
                return {
                    ...state,
                    databaseInfo: action.databaseInfo
                };
            case actions.SETDERIVEDQUERY:
                console.log(action.query);
                return {
                    ...state,
                    derivedSearch: action.query,
                };
            case actions.SETDERIVEDRESULTS:
                state.derivedResultsHasMore = true;
                state.derivedResults = action.results.sort(function (a, b) {
                    return a.RN - b.RN
                });
                return {
                    ...state,
                };
            case actions.CONCATDERIVEDRESULTS:
                if (action.results.length === 0) state.derivedResultsHasMore = false;
                state.derivedResults = state.derivedResults.concat(action.results).sort(function (a, b) {
                    return a.RN - b.RN
                });
                return {
                    ...state,
                };
            case actions.CONCATAUTHORS:
                if (action.results.length === 0) state.authorsHasMore = false;
                state.authors = state.authors.concat(action.authors).sort(function (a, b) {
                    return a.RN - b.RN
                });
                return {
                    ...state,
                };
            case actions.NEXTDERIVEDLOAD:
                state.derivedSearch.params.offset = state.derivedSearch.params.offset + state.derivedSearch.params.num;
                return {
                    ...state,
                };
            case actions.SETTABNUMBER:
                state.tabNumber = action.tabNumber;
                return {
                    ...state,
                };
            case actions.SETDERIVEDRESULTSCOUNT:
                state.derivedResultsCount = action.derivedResultsCount;
                return {
                    ...state,
                };
            case actions.RESETDERIVEDRESULTS:
                state.derivedResults = [];
                return {
                    ...state,
                };
            case actions.SETDERIVEDRESULTSTABTITLE:
                console.log(action.derivedResultTabTitle);
                state.derivedResultTabTitle = action.derivedResultTabTitle;
                return {
                    ...state,
                };
            case actions.SETAUTHORS:
                state.authorsHasMore = true;
                state.authorCount = action.authorCount;
                state.authors = action.authors;
                console.log('SETAUTHORS', state.authors);
                return {
                    ...state,
                };
            default:
                return state;
        }
    }
;

export default reducer;