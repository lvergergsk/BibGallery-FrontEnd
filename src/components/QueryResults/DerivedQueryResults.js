import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../store/actions";

import PublicationQueryResult from './PublicationQueryResult'
import {withStyles} from "material-ui/styles/index";
import axios from "axios/index";
import serverConfig from "../../serverConfig";
import {CircularProgress} from 'material-ui/Progress';

import InfiniteScroll from 'react-infinite-scroller';
import purple from "material-ui/colors/purple";

const styles = theme => ({
    list: {
        height: '84vh',
        overflow: 'auto',
        marginTop: '5px',
        width: '100%',
    },
    initializeProgress: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

class DerivedQueryResults extends React.Component {
    state = {};

    loadNext() {
        this.props.onNextDerivedLoad();
        let onConcatDerivedResults = this.props.onConcatDerivedResults;
        console.log(this.props.derivedSearch);
        let auth = {headers: {Authorization: 'bearer ' + this.props.JWT}};
        axios.post(serverConfig.backendUrl + 'search', this.props.derivedSearch,auth)
            .then(function (response) {
                onConcatDerivedResults(response.data.result);
            })
    }

    render() {
        const {classes, derivedResults, derivedSearch} = this.props;
        console.log(derivedSearch);
        return (<div>
                {derivedSearch !== undefined && derivedResults.length === 0 ? (
                    <div key={0}><CircularProgress className={classes.initializeProgress} size={100} thickness={2}
                                                   style={{color: purple[500]}}/></div>) : null}
                {(derivedResults === undefined || derivedResults == null || derivedResults.length === 0) ? null :
                    (<div className={classes.list}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadNext.bind(this)}
                            hasMore={this.props.derivedResultsHasMore}
                            useWindow={false}
                            loader={<div key={0}><CircularProgress className={classes.progress} size={100}
                                                                   thickness={2}/></div>}>
                            {derivedSearch.type === 'pub' ? (
                                this.props.derivedResults.map(derivedResult => {
                                    return <PublicationQueryResult
                                        key={derivedResult.RN}
                                        publication={derivedResult}
                                    />
                                })
                            ) : null}
                        </InfiniteScroll>
                    </div>)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        derivedResults: state.derivedResults,
        derivedResultsHasMore: state.derivedResultsHasMore,
        derivedSearch: state.derivedSearch,
        JWT:state.JWT,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNextDerivedLoad: () => dispatch({type: actions.NEXTDERIVEDLOAD}),
        onConcatDerivedResults: (results) => dispatch({type: actions.CONCATDERIVEDRESULTS, results: results})
    };
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DerivedQueryResults))