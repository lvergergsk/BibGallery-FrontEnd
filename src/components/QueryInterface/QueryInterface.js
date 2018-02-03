import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import QueryResults from './QueryResults/QueryResults'
import QueryControls from './QueryControls/QueryControls'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

function QueryInterface(props) {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={9} sm={9}>
                    <QueryResults/>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <QueryControls/>
                </Grid>
            </Grid>
        </div>
    );
}

QueryInterface.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QueryInterface);