import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Input from 'material-ui/Input';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import * as actions from "../../store/actions";
import {connect} from "react-redux";


const styles = theme => ({
    container: {},
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
        width: '40%',
    },
    button: {
        margin: theme.spacing.unit,
    },
    card: {
        marginBottom: '10px'
    },
});

class YearConstraint extends React.Component {
    state = {
        from: 1800,
        to: 2018
    };
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleYearFromChange(event) {
        this.props.onSetYearFrom(event.target.value)
    }

    handleYearToChange(event) {
        this.props.onSetYearTo(event.target.value)
    }

    render() {

        const {classes} = this.props;

        return (
            <Card className={classes.container}>
                <CardContent className={classes.card}>
                    <Typography>Year Between:</Typography>
                    <div>
                        <Input
                            className={classes.input}
                            placeholder="Start Year"
                            id="from-date"
                            onChange={this.handleYearFromChange.bind(this)}
                        />
                        <Input
                            placeholder="End Year"
                            className={classes.input}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                            onChange={this.handleYearToChange.bind(this)}
                        />
                    </div>
                </CardContent>
            </Card>
        );
    }
}

YearConstraint.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        onSetYearFrom: (yearFrom) => dispatch({type: actions.SETYEARFROM, yearFrom: yearFrom}),
        onSetYearTo: (yearTo) => dispatch({type: actions.SETYEARTO, yearTo: yearTo}),
    };

};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(YearConstraint));