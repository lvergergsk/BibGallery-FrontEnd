import React, {Component} from 'react';
import classes from './App.css'
import 'typeface-roboto'

import Reboot from 'material-ui/Reboot';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import {BrowserRouter, Route} from 'react-router-dom';


import Header from './containers/Header/Header';
import Landing from './components/Landing/Landing'
import QueryInterface from './containers/QueryInterface/QueryInterface'

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
                        <Reboot/>
                        <Header/>
                        <div className={classes["page-layout"]}>
                            <Route path="/" exact component={Landing}/>
                            <Route path="/query" exact component={QueryInterface}/>
                        </div>

                    </div>
                </BrowserRouter>
            </MuiThemeProvider>

        );
    }
}

export default App;
