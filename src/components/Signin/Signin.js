import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import React from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import serverConfig from '../../serverConfig';
import bookLogo from '../../assets/images/book-logo.png';
import {withStyles} from "material-ui/styles/index";
import * as actions from '../../store/actions';

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

class Signin extends React.Component {
    state = {
        username: '',
        password: '',
    }


    handleClick() {
        const setJWT = this.props.onLogin;
        const history = this.props.history;
        axios.post(serverConfig.backendUrl + 'login', {
            "username": this.state.username,
            "password": this.state.password
        })
            .then(function (response) {
                console.log(response);
                if (response.data.success === true) {
                    console.log("Login successfull");
                    setJWT(response.data.JWT);
                    history.push({pathname: '/query'});
                } else {
                    console.log("Username or password do not match");
                }
            });
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <div className={classes.Logo}>
                    <img src={bookLogo} alt="bookLogo" className={classes.Image}/> BibGallery
                </div>


                <form>
                    <div>
                        <div>
                            <TextField
                                required
                                label="Username/Email"
                                floatinglabeltext="Username"
                                onChange={(event) => this.setState({username: event.target.value})}
                                margin="normal"
                                className={classes.InputField}
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                type="password"
                                label="Password"
                                floatinglabeltext="Password"
                                onChange={(event) => this.setState({password: event.target.value})}
                                margin="normal"
                                className={classes.InputField}

                            />
                        </div>
                        <div>
                            <Button className={classes.Button} color="primary" variant="raised"
                                    onClick={() => this.handleClick()}>
                                Submit
                            </Button>

                            <Link to="/SignUp" style={{textDecoration: 'none'}}>
                                <Button className={classes.Button} color="primary" variant="raised">
                                    {'Sign Up Now'}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        JWT: state.JWT
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (JWT) => dispatch({type: actions.LOGIN, JWT: JWT}),
    };

};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Signin));
