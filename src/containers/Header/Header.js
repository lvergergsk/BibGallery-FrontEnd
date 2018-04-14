import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Switch from 'material-ui/Switch';
import {FormControlLabel} from 'material-ui/Form';
import Menu, {MenuItem} from 'material-ui/Menu';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Logo from '../../components/Logo/Logo'

const styles = {
    appBar: {
        backgroundColor: "transparent",
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends React.Component {
    state = {
        anchorEl: null,
    };

    handleChange = (event, checked) => {
        if (checked) {
            return this.props.onLogin();
        } else {
            return this.props.onLogout();
        }
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        console.log("valueAuth: " + this.props.auth);
        console.log("value: " + this.props.apiBaseUrl);
        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Link to="/"><Logo/></Link>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        BibGallery
                    </Typography>
                    {this.props.auth && (
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                    <FormControlLabel
                        control={
                            <Switch checked={this.props.auth} onChange={this.handleChange} aria-label="LoginSwitch"/>
                        }
                        label={this.props.auth ? 'Logout' : 'Login'}

                    />

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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Header));