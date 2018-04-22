import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary,} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import classNames from "classnames";
import Divider from 'material-ui/Divider';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    column: {
        flexBasis: '48%',
        marginLeft: '1%',
        marginRight: '1%',
    },
    fieldTitle: {
        marginBottom: '5px',
        textAlign: 'left',
        paddingLeft: '20%'
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },

});

class AuthorQueryResult extends React.Component {

    render() {
        const {classes, author} = this.props;
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography className={classes.heading}>{author.names[0]}</Typography>
                    <Typography className={classes.secondaryHeading}>Number of
                        Publications: {author.publications.length}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.column}>

                        <h4 className={classes.fieldTitle}>Other Name:</h4>
                        {author.names.map(function (name, key) {
                            return (<div key={key}>{name}</div>)
                        })}
                        <br/>
                        <Divider/>
                        <h4 className={classes.fieldTitle}>Websites:</h4>
                        {author.websites.map(function (website, key) {
                            return (<div key={key}>{website}</div>)
                        })}
                    </div>
                    <div className={classNames(classes.column, classes.helper)}>
                        <h4 className={classes.fieldTitle}>publications:</h4>
                        {author.publications.map(function (publication, key) {
                            return (<div key={key}>{publication}</div>)
                        })}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

AuthorQueryResult.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthorQueryResult);