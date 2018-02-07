import React, {Component}from 'react';
import PropTypes from 'prop-types';

// Material-ui:
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button'
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import axios from 'axios';
import serverConfig from '../../../serverConfig';


const styles = theme => ({
    container: {
        margin: "0px 0px 5px 0px",
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing.unit,
        textAlign: 'center'
    },
    content: {
        margin: 'auto',
    }
});

class TestQueryControl extends Component{

    makeTestQuery() {
        axios.get(serverConfig.backendUrl + "testDbQuery")
            .then(response => {
                    console.log(response)
                }
            )
    }

    render(){
        const { classes } = this.props;

        return(
            <Card className={classes.container}>
                <CardContent className={classes.content}>
                    <Typography>MakeTestQuery</Typography>
                    <div className={classes.button}>
                        <Button raised className={classes.button} onClick={this.makeTestQuery}>
                            Log test query.
                        </Button>
                    </div>

                </CardContent>
            </Card>
        )
    }
}


TestQueryControl.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestQueryControl);