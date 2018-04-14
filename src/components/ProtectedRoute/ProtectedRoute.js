import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

class ProtectedRoute extends React.Component {
    render() {
        const { component: Component, ...props } = this.props

        return (
            <Route
                {...props}
                render={props => (
                    this.props.auth?
                        <Component {...props} /> :
                        <Redirect to='/Signin' />
                )}
            />
        )
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};
export default connect(mapStateToProps)(ProtectedRoute);