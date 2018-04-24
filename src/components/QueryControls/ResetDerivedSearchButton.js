import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import Button from "material-ui/Button";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    column: {
        width: '45%',
        margin: '2px',
    },
    input: {
        margin: '3px',
        width: '80%',
    },
    button: {
        margin: theme.spacing.unit,
    },
    card: {
        marginBottom: '10px'
    },
});

class ResetDerivedSearchButton extends React.Component {

    onClickClose() {
        this.props.onSetTabNumber(0);
        this.props.onResetDerivedSearch();
    }

    render() {
        const {classes} = this.props;

        return (
            <Card>
                <CardContent className={classes.card}>
                    <Button variant="raised" color="primary" style={{padding: '10px'}}
                            onClick={this.onClickClose.bind(this)}>Close</Button>
                </CardContent>
            </Card>
        );
    }
}

ResetDerivedSearchButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        onResetDerivedSearch: () => dispatch({type: actions.RESETDERIVEDSEARCH}),
        onSetTabNumber: (tabNumber) => dispatch({type: actions.SETTABNUMBER, tabNumber: tabNumber}),
    };

};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ResetDerivedSearchButton));