import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {FormControl, FormControlLabel, FormGroup, FormLabel,} from 'material-ui/Form';


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

class TypeConstraint extends React.Component {
    state = {
        incollection: true,
        inproceeding: true,
        article: true,
        book: true,
        proceeding: true,
    };
    handleChange = name => event => {
        this.setState({[name]: event.target.checked}, function () {
            let publicationType = [];
            for (let key in this.state) {
                if (this.state[key]) publicationType.push(key)
            }
            this.props.onSetPublicationType(publicationType);
        });
    };


    render() {

        const {classes} = this.props;

        return (
            <Card>
                <CardContent className={classes.card}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Assign responsibility</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.incollection}
                                        onChange={this.handleChange('incollection')}
                                        value="incollection"
                                    />
                                }
                                label="incollection"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.inproceeding}
                                        onChange={this.handleChange('inproceeding')}
                                        value="inproceeding"
                                    />
                                }
                                label="inproceeding"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.article}
                                        onChange={this.handleChange('article')}
                                        value="article"
                                    />
                                }
                                label="article"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.book}
                                        onChange={this.handleChange('book')}
                                        value="book"
                                    />
                                }
                                label="book"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.proceeding}
                                        onChange={this.handleChange('proceeding')}
                                        value="proceeding"
                                    />
                                }
                                label="proceeding"
                            />
                        </FormGroup>
                    </FormControl>
                </CardContent>
            </Card>
        );
    }
}

TypeConstraint.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {
        publicationSearch: state.publicationSearch,
        currentPublicationSearch: state.currentPublicationSearch
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetPublicationType: (publicationType) => dispatch({
            type: actions.SETPUBLICATIONTYPE,
            publicationType: publicationType
        }),
    };

};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TypeConstraint));