import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Input from 'material-ui/Input';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import * as actions from "../../store/actions";
import {connect} from "react-redux";


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
    card: {
        marginBottom: '10px'
    },
});

class YearConstraint extends React.Component {
    state = {
        writtenBy: ''
    };

    handleChange(event) {
        this.props.onSetWrittenBy(event.target.value)
    }

    render() {

        const {classes} = this.props;

        return (
            <Card>
                <CardContent className={classes.card}>
                    <Typography>Written by:</Typography>
                    <div>
                        <Input
                            className={classes.input}
                            placeholder="Author Name"
                            id="Author"
                            onChange={this.handleChange.bind(this)}
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
        onSetWrittenBy: (writtenBy) => dispatch({type: actions.SETWRITTENBY, writtenBy: writtenBy}),
    };

};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(YearConstraint));