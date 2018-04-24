import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary,} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import classNames from "classnames";
import Divider from 'material-ui/Divider';
import ReactAux from '../../hoc/ReactAux/ReactAux';
import serverConfig from "../../serverConfig";
import axios from "axios/index";
import * as actions from "../../store/actions";
import {connect} from "react-redux";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        flexBasis: '60%',
        flexShrink: 0,
        textAlign: 'left',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        transform: 'translateY(20%)',
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

    onClickPublicationName(id) {
        this.props.onResetDerivedResults();
        this.props.onSetDerivedResultsTabTitle('Publication');
        this.props.onSetTabNumber(2);
        let query = {
            type: "pub",
            pubtype: ["incollection", "book"],
            params: {
                "title": this.props.author.PUBLICATION[id].NAME,
                "offset": 0,
                "num": 10
            },
            "order": {
                "type": "year",
                "order": "ASC"
            }
        };

        this.props.onSetDerivedQuery(query);
        let onSetDerivedResults = this.props.onSetDerivedResults;
        let onSetDerivedResultsCount = this.props.onSetDerivedResultsCount;
        let auth = {headers: {Authorization: 'bearer ' + this.props.JWT}};
        axios.post(serverConfig.backendUrl + 'search', query, auth)
            .then(function (response) {
                onSetDerivedResults(response.data.result);
                onSetDerivedResultsCount(response.data.count)
            });
    }

    render() {
        const {classes, author} = this.props;
        let homepages = author.HOMEPAGE === null ? [] :
            (this.isJsonString(author.HOMEPAGE) ? JSON.parse(author.HOMEPAGE) : [author.HOMEPAGE]);
        let affiliations = author.AFFILIATION === null ? [] :
            (this.isJsonString(author.AFFILIATION) ? JSON.parse(author.AFFILIATION) : [author.AFFILIATION]);
        let authorSynonym = author.SYNONYM;
        let authorName = authorSynonym.length > 0 ? authorSynonym[0].NAME : 'No name.';
        let otherNames = authorSynonym.length > 1 ? authorSynonym.slice(1).map(object => object.NAME) : [];
        let publicationTitles = author.PUBLICATION.map(p => p.NAME);
        let coauthorNames = author.COAUTHOR === undefined ? [] : author.COAUTHOR.map(c => c.NAME);
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography className={classes.heading}><i className="material-icons" style={{
                        marginRight: '10px',
                        transform: 'translateY(20%)',
                        textAlign: 'left'
                    }}>account_circle</i>{authorName}</Typography>
                    <Typography className={classes.secondaryHeading}>Number of
                        Publications: {publicationTitles.length}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.column}>
                        <h4 className={classes.fieldTitle}>publications:</h4>
                        {publicationTitles.map(publicationTitle => (
                            <div style={{textAlign: 'left',}}
                                 key={publicationTitles.indexOf(publicationTitle)}>- <a style={{textDecoration:'underline'}}
                                onClick={() => this.onClickPublicationName(publicationTitles.indexOf(publicationTitle))}>
                                {publicationTitle}
                            </a>
                            </div>))}
                    </div>
                    <div className={classNames(classes.column, classes.helper)}>
                        {coauthorNames.length === 0 ? null : <ReactAux>
                            <h4 className={classes.fieldTitle}>CoAuthors:</h4>
                            {coauthorNames.map(function (coauthorName) {
                                return (<div key={coauthorNames.indexOf(coauthorName)}>{coauthorName}</div>)
                            })}
                            <br/>
                            <Divider/>
                        </ReactAux>}
                        {otherNames.length === 0 ? null : (<ReactAux>
                            <h4 className={classes.fieldTitle}>Other Name:</h4>
                            {otherNames.map(name => (<div key={otherNames.indexOf(name)}>{name}</div>))}
                            <br/>
                            <Divider/>
                        </ReactAux>)}
                        {homepages.length === 0 ? null : <ReactAux>
                            <h4 className={classes.fieldTitle}>Homepages:</h4>
                            {homepages.map(function (homepage) {
                                return (<div key={homepages.indexOf(homepage)}>{homepage}</div>)
                            })}
                            <br/>
                            <Divider/>
                        </ReactAux>}
                        {affiliations.length === 0 ? null : <ReactAux>
                            <h4 className={classes.fieldTitle}>Affiliations:</h4>
                            {affiliations.map(function (affiliation) {
                                return (<div key={affiliations.indexOf(affiliation)}>{affiliation}</div>)
                            })}
                        </ReactAux>}

                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

AuthorQueryResult.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {
        derivedSearch: state.derivedSearch,
        JWT: state.JWT
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onResetDerivedResults: () => dispatch({type: actions.RESETDERIVEDRESULTS}),
        onSetDerivedQuery: (query) => {
            dispatch({type: actions.SETDERIVEDQUERY, query: query})
        },
        onSetDerivedResults: (results) => {
            dispatch({type: actions.SETDERIVEDRESULTS, results: results})
        },
        onSetTabNumber: (tabNumber) => dispatch({type: actions.SETTABNUMBER, tabNumber: tabNumber}),
        onSetDerivedResultsCount: (derivedResultsCount) => dispatch({
            type: actions.SETDERIVEDRESULTSCOUNT,
            derivedResultsCount: derivedResultsCount
        }),
        onSetDerivedResultsTabTitle: (derivedResultTabTitle) => dispatch({
            type: actions.SETDERIVEDRESULTSTABTITLE,
            derivedResultTabTitle: derivedResultTabTitle
        }),
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AuthorQueryResult));