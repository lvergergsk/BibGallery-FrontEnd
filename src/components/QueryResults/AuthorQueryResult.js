import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary,} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import classNames from "classnames";
import Divider from 'material-ui/Divider';
import ReactAux from '../../hoc/ReactAux/ReactAux';
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
    isJsonString(str) {
        try {
            JSON.parse(str).map(function () {
                return null;
            });
        } catch (e) {
            return false;
        }
        return true;
    }

    render() {
        const {classes, author} = this.props;
        let homepages = this.isJsonString(author.HOMEPAGE) ? JSON.parse(author.HOMEPAGE) : [author.HOMEPAGE];
        let affiliations = this.isJsonString(author.AFFILIATION) ? JSON.parse(author.AFFILIATION) : [author.AFFILIATION];
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography className={classes.heading}>#authorName</Typography>
                    <Typography className={classes.secondaryHeading}>Number of
                        Publications: #theNumber</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.column}>

                        <h4 className={classes.fieldTitle}>Other Name:</h4>
                        {/*{author.names.map(function (name, key) {*/}
                        {/*return (<div key={key}>{name}</div>)*/}
                        {/*})}*/}
                        #otherNames
                        <br/>
                        {homepages.length===0?null:<ReactAux><Divider/>
                            <h4 className={classes.fieldTitle}>Homepages:</h4>
                            {homepages.map(function (homepage) {
                                return (<div key={homepages.indexOf(homepage)}>{homepage}</div>)
                            })}
                            <br/></ReactAux>}
                        <Divider/>
                        <h4 className={classes.fieldTitle}>Affiliations:</h4>
                        {affiliations.map(function (affiliation) {
                            return (<div key={affiliations.indexOf(affiliation)}>{affiliation}</div>)
                        })}
                    </div>
                    <div className={classNames(classes.column, classes.helper)}>
                        <h4 className={classes.fieldTitle}>publications:</h4>
                        {/*{author.publications.map(function (publication, key) {*/}
                        {/*return (<div key={key}>{publication}</div>)*/}
                        {/*})}*/}
                        #publications
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