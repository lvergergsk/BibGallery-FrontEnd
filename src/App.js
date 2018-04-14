import React, {Component} from 'react';
import classes from './css/App.css';
import 'typeface-roboto';
import CssBaseline from 'material-ui/CssBaseline';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import {BrowserRouter, Route} from 'react-router-dom';


import Header from './containers/Header/Header';
import Landing from './components/Landing/Landing'
import QueryInterface from './containers/QueryInterface/QueryInterface'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'

// const theme = createMuiTheme({
//     palette: {
//         primary: {main: "#FFF"},
//         secondary: {main: green[300]},
//         error: red,
//         contrastThreshold: 3,
//         tonalOffset: 0.2,
//     },
// });

const theme = createMuiTheme();

class App extends Component {

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <div className={classes.App}>
                        <CssBaseline/>
                        <Header/>
                        <div className={classes["page-layout"]}>
                            <Route path="/" exact component={Landing}/>
                            <Route path="/query" exact component={QueryInterface}/>
                            <Route path="/signin" exact component={Signin}/>
                            <Route path="/signup" exact component={Signup}/>
                            {this.props.auth &&
                            <Route path="/query" component={QueryInterface}/>
                            }

                        </div>

                    </div>
                </BrowserRouter>
            </MuiThemeProvider>

        );
    }
}

export default App;
