// React:
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Material-UI
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
// Axios:

// Other:
import QueryResults from '../../components/QueryResults/QueryResults';
import QueryControls from '../../components/QueryControls/QueryControls';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
    },
    button: {
        padding: 5,
    }
});

class QueryInterface extends Component {

    componentDidMount() {
        // do some initialization
    }

    render() {
        const {classes} = this.props;

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
        )
    }
}

QueryInterface.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QueryInterface);