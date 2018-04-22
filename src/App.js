import React, {Component} from 'react';
import classes from './css/App.css';
import 'typeface-roboto';
import CssBaseline from 'material-ui/CssBaseline';
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {BrowserRouter, Route} from 'react-router-dom';
import axios from 'axios';


import Header from './containers/Header/Header';
import Landing from './components/Landing/Landing'
import QueryInterface from './containers/QueryInterface/QueryInterface'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'


import Test from './testExpansionPanel'
import {connect} from "react-redux";
import serverConfig from "./serverConfig";

const theme = createMuiTheme();

class App extends Component {

    onClickSearch() {
        const publicationSearch = {
            "type": "pub",
            "pubtype": ["incollection", "book"],
            "params": {
                "title": this.props.keyword,
                "yearbegin": this.props.yearFrom,
                "yearend": this.props.yearTo,
                "offset": 0,
                "num": 10
            },
            "order": {
                "type": "year",
                "order": "ASC"
            }
        };

        axios.post(serverConfig.backendUrl + 'search', publicationSearch)
            .then(function (response) {
                console.log(response);
            })

        console.log(this.props.keyword);

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
                            <Route path="/query" exact component={QueryInterface}/>
                            <Route path="/signin" exact component={Signin}/>
                            <Route path="/signup" exact component={Signup}/>
                            <Route path="/test" exact component={Test}/>
                            {/*{this.props.auth &&*/}
                            {/*<Route path="/query" component={QueryInterface}/>*/}
                            {/*}*/}

                        </div>

                    </div>
                </BrowserRouter>
            </MuiThemeProvider>

        );
    }
}

const mapStateToProps = state => {
    return {
        keyword: state.keyword,
        yearFrom: state.yearFrom,
        yearTo: state.yearTo,
    };
};

const mapDispatchToProps = dispatch => {
    return {};

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
