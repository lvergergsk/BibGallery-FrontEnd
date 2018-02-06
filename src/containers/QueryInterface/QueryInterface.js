// React:
import React, {Component}from 'react';
import PropTypes from 'prop-types';

// Material-UI
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';

// Axios:
import axios from 'axios'

// lverg:
import QueryResults from '../../components/QueryResults/QueryResults'
import QueryControls from '../../components/QueryControls/QueryControls'
import serverConfig from '../../serverConfig'

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

class QueryInterface extends Component{

    componentDidMount(){
        axios.get(serverConfig.backendUrl+"dbapi")
            .then(response=>{
                console.log(response)
                }
            )
    }

    render(){
        const {classes} = this.props;

        return(
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