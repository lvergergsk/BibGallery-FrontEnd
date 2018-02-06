import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Input from 'material-ui/Input';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';


const styles = theme => ({
    container: {
        margin: "0px 0px 5px 0px",
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        margin: theme.spacing.unit,
        width: '40%',
    },
});

function QueryControl(props) {
    const {classes} = props;
    return (
        <Card className={classes.container}>
            <CardContent>
                <Typography>Year</Typography>
                <Input
                    placeholder="Start Date"
                    id="from-date"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />
                <Input
                    placeholder="End Date"
                    className={classes.input}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />
            </CardContent>
        </Card>
    );
}

QueryControl.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QueryControl);