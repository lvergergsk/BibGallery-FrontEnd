import React, {Component} from 'react';
import classes from './App.css'
import 'typeface-roboto'

import Reboot from 'material-ui/Reboot';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import red from 'material-ui/colors/red';

import Header from './components/Header/Header';
import Landing from './components/Landing/Landing'
import QueryInterface from './components/QueryInterface/QueryInterface'

const theme = createMuiTheme({
    palette: {
        primary: {main: purple[500]},
        secondary: {main: '#11cb5f'},
        error: red,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});

class App extends Component {
    state = {
        authenticated: false
    };

    logInHandler = (event) => {
        this.setState({authenticated: true});
    };

    logOutHandler = (event) => {
        this.setState({authenticated: false});
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.App}>
                    <Reboot/>
                    <Header/>
                    <div className={classes["page-layout"]}>
                        <Landing/>
                        <QueryInterface/>
                    </div>

                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
