// React:
import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Material-UI
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Tabs, {Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
// Other:
import PublicationQueryResults from '../../components/QueryResults/PublicationQueryResults';
import AuthorQueryResults from '../../components/QueryResults/AuthorQueryResults'
import QueryControls from '../../components/QueryControls/QueryControls';
// import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute'


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
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    componentDidMount() {
        // do some initialization
    }

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.root}>
                {/*<ProtectedRoute/>*/}
                <Grid container spacing={24}>
                    <Grid item xs={9} sm={9}>
                        <Paper>
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered>
                                <Tab label="Publications"/>
                                <Tab label="Authors"/>
                            </Tabs>
                        </Paper>
                        {value === 0 && <PublicationQueryResults/>}
                        {value === 1 && <AuthorQueryResults/>}


                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <QueryControls display={value}/>
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