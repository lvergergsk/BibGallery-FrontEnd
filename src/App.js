import React, {Component} from 'react';
import classes from './css/App.css';
import 'typeface-roboto';
import CssBaseline from 'material-ui/CssBaseline';
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {BrowserRouter, Route} from 'react-router-dom';
import axios from 'axios';


import Header from './components/Header/Header';
import Landing from './components/Landing/Landing'
import QueryInterface from './components/QueryInterface/QueryInterface'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import Test from './testExpansionPanel'

import {connect} from "react-redux";
import serverConfig from "./serverConfig";
import * as actions from "./store/actions";
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';

const theme = createMuiTheme();

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
}

const PropsRoute = ({component, ...rest}) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
}

class App extends Component {
    state = {
        open: false,
        transition: null,
    };


    handleClose = () => {
        this.setState({open: false});
    };

    TransitionUp(props) {
        return <Slide direction="up" {...props} />;
    }

    searchPublication() {
        this.props.onSaveCurrentPublicationSearch();
        this.props.onResetPublications();
        let onSetPublications = this.props.onSetPublications;
        let auth = {headers: {Authorization: 'bearer ' + this.props.JWT}};
        axios.post(serverConfig.backendUrl + 'search', this.props.publicationSearch, auth)
            .then(function (response) {
                onSetPublications(response.data.result, response.data.count);
            });
    }

    searchAuthor() {
        this.props.onSaveCurrentAuthorSearch();
        this.props.onResetAuthors();
        let onSetAuthors = this.props.onSetAuthors;
        let auth = {headers: {Authorization: 'bearer ' + this.props.JWT}};

        axios.post(serverConfig.backendUrl + 'search', this.props.authorSearch, auth)
            .then(function (response) {
                onSetAuthors(response.data.result, response.data.count);
            });
    }

    onClickSearch() {
        if (this.props.publicationSearch.pubtype.length === 0) {
            this.setState({open: true, transition: this.TransitionUp});
            return;
        }

        this.searchPublication();
        this.searchAuthor()
    }



    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <div className={classes.App}>
                        <CssBaseline/>
                        <Header onClickSearch={this.onClickSearch.bind(this)}/>
                        <div className={classes["page-layout"]}>
                            <Route path="/" exact component={Landing}/>
                            <PropsRoute path="/query" exact component={QueryInterface}
                                        searchPublication={this.searchPublication.bind(this)}
                                        searchAuthor={this.searchAuthor.bind(this)}/>
                            <Route path="/signin" exact component={Signin}/>
                            <Route path="/signup" exact component={Signup}/>
                            <Route path="/test" exact component={Test}/>
                            {/*{this.props.auth &&*/}
                            {/*<Route path="/query" c1omponent={QueryInterface}/>*/}
                            {/*}*/}
                        </div>
                        <Snackbar
                            open={this.state.open}
                            onClose={this.handleClose}
                            transition={this.state.transition}
                            SnackbarContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">Please select publication type.</span>}
                        />
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>

        );
    }
}

const mapStateToProps = state => {
    return {
        publicationSearch: state.publicationSearch,
        authorSearch: state.authorSearch,
        JWT: state.JWT,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetPublications: () => dispatch({type: actions.RESETPUBLICATIONS}),
        onResetAuthors: () => dispatch({type: actions.RESETAUTHORS}),
        onSetPublications: (publications, publicationCount) => dispatch({
            type: actions.SETPUBLICATIONS,
            publications: publications,
            publicationCount: publicationCount
        }),
        onSaveCurrentPublicationSearch: () => dispatch({type: actions.SAVECURRENTPUBLICATIONSEARCH}),
        onSetAuthors: (authors, authorCount) => dispatch({
            type: actions.SETAUTHORS,
            authors: authors,
            authorCount: authorCount
        }),
        onSaveCurrentAuthorSearch: () => dispatch({type: actions.SAVECURRENTAUTHORSEARCH}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
