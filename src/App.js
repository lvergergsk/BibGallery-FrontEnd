import React, {Component} from 'react';
import './App.css';
import 'typeface-roboto'

import Reboot from 'material-ui/Reboot';
import Button from 'material-ui/Button';
import lg from 'material-ui'

import Header from './Header/Header';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import deepOrange from 'material-ui/colors/deepOrange';
import pink from 'material-ui/colors/pink';
import purple from 'material-ui/colors/purple';
import red from 'material-ui/colors/red';

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
    palette: {
        primary: { main: purple[500] },
        secondary: { main: '#11cb5f' },
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
                <div className="App">
                    <Reboot/>
                    <Header className="App-header"/>
                    <lg className="App-intro test">
                        <div>
                            <Button raised color="secondary">
                                Hello World
                            </Button>
                        </div>

                    </lg>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
