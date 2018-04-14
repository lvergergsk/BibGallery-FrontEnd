import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import React from 'react'
import axios from 'axios';
import Card, { CardContent } from 'material-ui/Card';
import classes from '../../css/user-form.css';
import {connect} from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
        }
    }



    handleClick(){
        let temp = true; // will be changed when actually connecting to database
        let payload= {
            params: {
            "email": this.state.username,
            "password": this.state.password
        }
        };
        console.log(this.props.apiBaseUrl);
        axios.post(this.props.apiBaseUrl+'/login', payload)
            .then(function (response) {
                console.log(response);
                if(temp=== true){
                    console.log("Login successfull");
                    return this.props.onLogin();
                }
                else if(temp === true){
                    console.log("Username password do not match");
                    alert("username password do not match")
                    return this.props.onLogout();
                }
                else{
                    console.log("Username does not exists");
                    alert("Username does not exist");
                    return this.props.onLogout();
                }
            })
            .catch(function (error) {
                console.log(error);
                return this.props.onLogout();
            });
    }// end of handleClick method

    render() {
        return (
            <div className={classes["user-form"]}>
                <Card className = {classes["card-comp"]}>
                    <CardContent>
                        <ProtectedRoute/>
                <form>
                    <div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <TextField
                            required
                            label="Username/Email"
                            floatinglabeltext="Username"
                            onChange = {(event) => this.setState({username:event.target.value})}
                            margin= "normal"
                        />
                        <br/>
                        <TextField
                            required
                            type="password"
                            label="Password"
                            floatinglabeltext="Password"
                            onChange = {(event) => this.setState({password:event.target.value})}
                            margin= "normal"
                        />
                        <br/>
                        <br/>
                        <Button className={classes["button-color"]} color = "secondary" variant="raised" onClick={() => this.handleClick()}>
                           Submit
                        </Button>
                        <br/>
                        <br/>
                        <Link to="/SignUp">
                        <Button className={classes["button-color"]} color = "secondary" variant="raised" >
                            {'Sign Up Now'}
                        </Button>
                        </Link>
                    </div>
                </form>
                    </CardContent>
                </Card>
            </div>


    );
    }
    }const mapStateToProps = state => {
    return {
        auth: state.auth,
        apiBaseUrl: state.apiBaseUrl
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: () => dispatch({type: 'LOGIN'}),
        onLogout: () => dispatch({type: 'LOGOUT'})
    };

};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
