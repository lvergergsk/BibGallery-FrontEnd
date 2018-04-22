import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


import Logo from '../../components/Logo/Logo'
import SearchBar from "./SearchBar";
import {Button} from "material-ui";
import ReactAux from "../../hoc/ReactAux/ReactAux";
import * as actions from '../../store/actions'

const styles = {
    appBar: {
        backgroundColor: 'transparent',
    },
    toolBar: {
        padding: '50px',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    searchBar: {
        bolderStyle: 'solid',
        marginLeft: '150px',
    },
    buttonGroup: {
        marginLeft: 'auto',
    },
    button: {
        margin: '5px',
    }

};

class Header extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Link to="/" style={{textDecoration: 'none'}}><Logo/></Link>
                    {
                        this.props.JWT === null ? null :
                            <div className={classes.searchBar}>
                                <SearchBar onClickSearch={this.props.onClickSearch}/>
                            </div>
                    }
                    <div className={classes.buttonGroup}>
                        {
                            this.props.JWT === null ? (
                                <ReactAux>
                                    <Link to="/Signin" style={{textDecoration: 'none'}}>
                                        <Button variant="raised" color="primary" className={classes.button}>
                                            Sign in
                                        </Button>
                                    </Link>
                                    <Link to="/Signup" style={{textDecoration: 'none'}}>
                                        <Button variant="raised" color="primary" className={classes.button}>
                                            Sign up
                                        </Button>
                                    </Link>
                                </ReactAux>
                            ) : null
                        }
                        {
                            this.props.JWT === null ? null :
                                <ReactAux>
                                    <Link to="/" style={{textDecoration: 'none'}}>
                                        <Button variant="raised" color="primary" className={classes.button} onClick={this.props.onLogout}>
                                            Sign out
                                        </Button>
                                    </Link>
                                    <Link to="/query" style={{textDecoration: 'none'}}>
                                        <Button variant="raised" color="primary" className={classes.button}>
                                            Query Page
                                        </Button>
                                    </Link>
                                </ReactAux>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        JWT: state.JWT,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({type: actions.LOGOUT})
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Header));