import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary,} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import classNames from 'classnames'
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
    details: {
        alignItems: 'center',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
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
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
    },
});

class PublicationQueryResult extends React.Component {

    render() {
        const {classes, publication} = this.props;
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography className={classes.heading}>{publication.type}</Typography>
                    <Typography className={classes.secondaryHeading}>{publication.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.detail}>
                    <div className={classes.column}>
                        <div>
                            <h4 className={classes.fieldTitle}>Year:</h4>
                            {publication.year}
                        </div>
                        <br/>
                        <Divider/>
                        <div>
                            <h4 className={classes.fieldTitle}>Author:</h4>
                            {publication.authors.map(function (author, key) {
                                return (<div key={key}>{author}</div>)
                            })}
                        </div>
                    </div>
                    <div className={classNames(classes.column, classes.helper)}>
                        <h4 className={classes.fieldTitle}>cites:</h4>
                        {publication.cited.map(function (cite, key) {
                            return (<div key={key}>{cite}</div>)
                        })}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

PublicationQueryResult.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicationQueryResult);