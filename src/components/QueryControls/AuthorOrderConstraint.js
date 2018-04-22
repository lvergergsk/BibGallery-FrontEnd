import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';



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
        marginBottom:'10px'
    },
});

class AuthorOrderConstraint extends React.Component {
    state = {
        type: 0,
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {

        const {classes} = this.props;

        return (
            <Card>
                <CardContent className={classes.card}>
                    <Typography>Sort author by:</Typography>
                    <div>
                        <Select
                            className={classes.input}
                            value={this.state.type}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'type',
                                id: 'type-of-publication',
                            }}
                        >
                            <MenuItem value={0}>Sort by Id</MenuItem>
                            <MenuItem value={1}>Sort by total publication</MenuItem>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

AuthorOrderConstraint.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthorOrderConstraint);