import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {withStyles} from "material-ui/styles/index";
import bookLogo from '../../assets/images/book-logo.png';
import * as actions from '../../store/actions'

const styles = {
    Logo: {
        padding: '24px',
        height: '150px',
        fontFamily: 'cursive',
        fontSize: '70px',
    },
    Image: {
        height: '100%',
        padding: '10px',
    },
    Button: {
        margin: '10px',
    },
    InputField: {
        minWidth: '500px',
        width: '40%',
        textAlign: 'center',
    }
};

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            userText: '',
            emailText: '',
            passwordText: '',
            passwordVerText: '',
            errUser: false,
            errEmail: false,
            errPassword: false,
            errPasswordVer: false,
            isValid: false,
        }
    }

    // research for validator
    validateUsername(event) {
        let input = event.target.value;
        let USERNAME_PATTERN = new RegExp('^[a-zA-Z0-9]$');
        // the max size of the input must be less than 100 to be passed into a hash function
        if (input.length < 6 && input.length < 100) {
            this.setState({errUser: true});
            this.setState({userText: "usernames must have least 6 characters"});
        } else if ((USERNAME_PATTERN.test(input))) {
            this.setState({errUser: true});
            this.setState({userText: "usernames can only contain letters and numebrs"});
        }
        else {
            this.setState({errUser: false});
            this.setState({userText: ""});
            this.setState({username: event.target.value});
        }
        this.isValid();

    }

    validateEmail(event) {
        let input = event.target.value;
        // let EMAIL_PATTERN = '/^\\S+@\\S+\.\\S+$/';
        let EMAIL_PATTERN = '/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/';
        if (input.match(EMAIL_PATTERN)) {
            this.setState({errEmail: true});
            this.setState({emailText: "emails must have the format of xxx@xxxx.xx"});
        } else {
            this.setState({errEmail: false});
            this.setState({emailText: ""});
            this.setState({email: event.target.value});
        }
        this.isValid();
    }

    validatePassword(event) {

        let input = event.target.value;
        let PASSWORD_PATTERN = new RegExp('^[a-zA-Z0-9]$');
        if (input.length < 6) {
            this.setState({errPassword: true});
            this.setState({passwordText: "password must have least 6 characters"});
        } else if ((PASSWORD_PATTERN.test(input))) {
            this.setState({errPassword: true});
            this.setState({passwordText: "password can only contain letters and numebrs"});
        }
        else {
            this.setState({errPassword: false});
            this.setState({passwordText: ""});
            this.setState({password: input});
        }
        this.isValid();
    }

    validatePasswordVer(event) {
        let input = event.target.value;
        if (input !== this.state.password) {
            this.setState({errPasswordVer: true});
            this.setState({passwordVerText: "Password does not match"});
        } else {
            this.setState({errPasswordVer: false});
            this.setState({passwordVerText: ""});
        }
        this.isValid();
    }

    isValid() {
        if (!this.state.errEmail && !this.state.errUser && !this.state.errPassword && !this.state.errPasswordVer) {
            // console.log(!this.state.errEmail && !this.state.errUser && !this.state.errPassword);
            this.setState({isValid: true});
        }
    }

    handleClick() {
        var apiBaseUrl = "http://localhost:3001/";
        // console.log("values", this.state.username, this.state.password, this.state.email);
        const setJWT = this.props.onLogin;
        const history = this.props.history;


        var payload = {
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.password
        };
        axios.post(apiBaseUrl + 'register', payload)
            .then(function (response) {
                if (response.data.success === true) {
                    // console.log("registration successfull");
                    setJWT(response.data.JWT);
                    history.push({pathname: '/query'});
                }
            });
    }

    render() {
        const {classes} = this.props;

        return (
            // determine if to use react aux to render multiple components
            <div>
                <div className={classes.Logo}>
                    <img src={bookLogo} alt="bookLogo" className={classes.Image}/> BibGallery
                </div>
                <form>
                    <div>
                        <TextField
                            required
                            id="username"
                            label="UserName"
                            floatinglabeltext="UserName"
                            error={this.state.errUser}
                            helperText={this.state.userText}
                            onChange={(event) => (this.validateUsername(event))}
                            margin="normal"
                            className={classes.InputField}
                        />
                    </div>
                    <div>
                        <TextField
                            id="email"
                            required
                            label="Email"
                            type="email"
                            floatinglabeltext="Email"
                            error={this.state.errEmail}
                            helperText={this.state.emailText}
                            onChange={(event) => (this.validateEmail(event))}
                            margin="normal"
                            className={classes.InputField}
                        />
                    </div>
                    <div>
                        <TextField
                            id="password"
                            required
                            type="password"
                            label="Password"
                            floatinglabeltext="Password"
                            error={this.state.errPassword}
                            helperText={this.state.passwordText}
                            onChange={(event) => (this.validatePassword(event))}
                            margin="normal"
                            className={classes.InputField}
                        />
                    </div>
                    <div>
                        <TextField
                            id="password_verify"
                            required
                            type="password"
                            label="Enter Password Again"
                            error={this.state.errPasswordVer}
                            helperText={this.state.passwordVerText}
                            floatinglabeltext="Password"
                            onChange={(event) => (this.validatePasswordVer(event))}
                            margin="normal"
                            className={classes.InputField}
                        />
                    </div>
                    <div>
                        <Button disabled={!this.state.isValid} variant="raised" color='primary'
                                onClick={(event) => this.handleClick(event)} className={classes.Button}>
                            Submit
                        </Button>
                    </div>


                </form>
            </div>
        );
    }// end of render
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (JWT) => dispatch({type: actions.LOGIN, JWT: JWT}),
    };

};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Signup));
