import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../store/actions";

import PublicationQueryResult from './PublicationQueryResult'
import {withStyles} from "material-ui/styles/index";
import axios from "axios/index";
import serverConfig from "../../serverConfig";
import {CircularProgress} from 'material-ui/Progress';

import InfiniteScroll from 'react-infinite-scroller';
import purple from 'material-ui/colors/purple';

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

class PublicationQueryResults extends React.Component {
    state = {};

    componentDidMount() {
        if (this.props.publications.length === 0)
            this.props.searchPublication();
    }

    loadNext() {
        this.props.onNextPublicationLoad();
        let onConcatPublications = this.props.onConcatPublications;
        let auth = {headers: {Authorization: 'bearer ' + this.props.JWT}};
        axios.post(serverConfig.backendUrl + 'search', this.props.currentPublicationSearch, auth)
            .then(function (response) {
                onConcatPublications(response.data.result);
                // onNextPublicationLoad();
            })
    }

    render() {
        const {classes, publications} = this.props;
        return (<div>
                {publications.length === 0 && this.props.publicationsHasMore ?
                    (<div key={0}><CircularProgress className={classes.initializeProgress} size={100} thickness={2}
                                                    style={{color: purple[500]}}/></div>) :
                    (<div className={classes.list}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadNext.bind(this)}
                            hasMore={this.props.publicationsHasMore}
                            useWindow={false}
                            loader={<div key={0}><CircularProgress className={classes.progress} size={100}
                                                                   thickness={2}/></div>}>
                            {this.props.publications.map(publication => {
                                return <PublicationQueryResult
                                    key={publication.RN}
                                    publication={publication}
                                />
                            })}
                        </InfiniteScroll>
                    </div>)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        publications: state.publications,
        publicationsHasMore: state.publicationsHasMore,
        currentPublicationSearch: state.currentPublicationSearch,
        JWT: state.JWT,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNextPublicationLoad: () => dispatch({type: actions.NEXTPUBLICATIONLOAD}),
        onConcatPublications: (publications) => dispatch({type: actions.CONCATPUBLICATIONS, publications: publications})
    };
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PublicationQueryResults))