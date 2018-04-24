import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary,} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import classNames from 'classnames'
import Divider from 'material-ui/Divider';
import ReactAux from '../../hoc/ReactAux/ReactAux'
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import axios from "axios/index";
import serverConfig from "../../serverConfig";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '13.33%',
        flexShrink: 0,
        fontStyle: 'italic',
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
        fontSize: theme.typography.pxToRem(20),
        transform: 'translateY(15%)',

    },
});

class PublicationQueryResult extends React.Component {
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

    onClickJournal() {
        this.props.onResetDerivedResults();
        this.props.onSetDerivedResultsTabTitle(this.props.publication.JOURNAL);
        this.props.onSetTabNumber(2);
        let query = {
            type: "pub",
            pubtype: ['article'],
            params: {
                journal: this.props.publication.JOURNAL,
                offset: 0,
                num: 20
            },
            order: {
                type: "year",
                order: "DESC"
            }
        };

        this.props.onSetDerivedQuery(query);
        let onSetDerivedResults = this.props.onSetDerivedResults;
        let onSetDerivedResultsCount = this.props.onSetDerivedResultsCount;
        axios.post(serverConfig.backendUrl + 'search', query)
            .then(function (response) {
                onSetDerivedResults(response.data.result);
                onSetDerivedResultsCount(response.data.count)
            });
    }

    onClickBook() {
        this.props.onResetDerivedResults();
        this.props.onSetDerivedResultsTabTitle(this.props.publication.BOOKTITLE);
        this.props.onSetTabNumber(2);
        let query = {
            type: "pub",
            pubtype: ['incollection'],
            params: {
                bookid: this.props.publication.CROSSREF,
                offset: 0,
                num: 20
            },
            order: {
                type: "year",
                order: "DESC"
            }
        };

        this.props.onSetDerivedQuery(query);
        let onSetDerivedResults = this.props.onSetDerivedResults;
        let onSetDerivedResultsCount = this.props.onSetDerivedResultsCount;
        axios.post(serverConfig.backendUrl + 'search', query)
            .then(function (response) {
                onSetDerivedResults(response.data.result);
                onSetDerivedResultsCount(response.data.count)
            });
    }

    onClickProceeding() {
        this.props.onResetDerivedResults();
        this.props.onSetDerivedResultsTabTitle(this.props.publication.BOOKTITLE);
        this.props.onSetTabNumber(2);
        let query = {
            type: "pub",
            pubtype: ['inproceeding'],
            params: {
                proceedingid: this.props.publication.CROSSREF,
                offset: 0,
                num: 20
            },
            order: {
                type: "year",
                order: "DESC"
            }
        };

        this.props.onSetDerivedQuery(query);
        let onSetDerivedResults = this.props.onSetDerivedResults;
        let onSetDerivedResultsCount = this.props.onSetDerivedResultsCount;
        axios.post(serverConfig.backendUrl + 'search', query)
            .then(function (response) {
                onSetDerivedResults(response.data.result);
                onSetDerivedResultsCount(response.data.count)
            });
    }

    render() {
        const {classes, publication} = this.props;
        let ISBN = publication.ISBN === undefined || publication.ISBN === null ? [] :
            (this.isJsonString(publication.ISBN) ? JSON.parse(publication.ISBN) : [publication.ISBN]);
        let citations = publication.CITATION === undefined || publication.CITATION === null ? [] : publication.CITATION;
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography className={classes.heading}>
                        {publication.TYPE === 'article' ?
                            <i className="material-icons" style={{
                                marginRight: '10px',
                                transform: 'translateY(20%)'
                            }}>assignment</i> : null}
                        {publication.TYPE === 'book' ?
                            <i className="material-icons" style={{
                                marginRight: '10px',
                                transform: 'translateY(20%)'
                            }}>book</i> : null}
                        {publication.TYPE === 'incollection' ?
                            <i className="material-icons" style={{
                                marginRight: '10px',
                                transform: 'translateY(20%)'
                            }}>chrome_reader_mode</i> : null}
                        {publication.TYPE === 'inproceeding' ?
                            <i className="material-icons" style={{
                                marginRight: '10px',
                                transform: 'translateY(20%)'
                            }}>description</i> : null}
                        {publication.TYPE === 'proceeding' ?
                            <i className="material-icons" style={{
                                marginRight: '10px',
                                transform: 'translateY(20%)'
                            }}>account_balance_wallet</i> : null}

                        {publication.TYPE.toUpperCase()}</Typography>
                    <Typography className={classes.secondaryHeading}>{publication.TITLE}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.detail}>
                    <div className={classes.column}>
                        <div>
                            <h4 className={classes.fieldTitle}>Publication Id:</h4>
                            {publication.ID}
                        </div>
                        <br/>
                        {ISBN.length === 0 ? null : (<ReactAux>
                            <Divider/>
                            <div>
                                <h4 className={classes.fieldTitle}>ISBN:</h4>
                                {ISBN.map(function (isbn) {
                                    return (<div key={ISBN.indexOf(isbn)}>{isbn}</div>)
                                })}
                            </div>
                            <br/>
                        </ReactAux>)}
                        {(publication.YEAR === undefined || publication.YEAR === null) ? null : (
                            <ReactAux>
                                <Divider/>
                                <div>
                                    <h4 className={classes.fieldTitle}>Year:</h4>
                                    {publication.YEAR}
                                </div>
                                <br/>
                            </ReactAux>)}

                        {(publication.JOURNAL === undefined || publication.JOURNAL === null) &&
                        (publication.BOOKTITLE === undefined || publication.BOOKTITLE === null) ? null : (
                            <ReactAux>
                                <Divider/>
                                {publication.TYPE === 'article' ? (
                                    <h4 className={classes.fieldTitle}>Journal:
                                        <a
                                            onClick={this.onClickJournal.bind(this)}> {publication.JOURNAL}</a>
                                    </h4>
                                ) : null}
                                {publication.TYPE === 'incollection' ? (
                                    <h4 className={classes.fieldTitle}>Book: <a
                                        onClick={this.onClickBook.bind(this)}>{publication.BOOKTITLE}</a></h4>
                                ) : null}
                                {publication.TYPE === 'inproceeding' ? (
                                    <h4 className={classes.fieldTitle}>Proceeding:
                                        <a onClick={this.onClickProceeding.bind(this)}>{publication.BOOKTITLE}</a></h4>
                                ) : null}
                                {publication.TYPE === 'proceeding' ? (
                                    <h4 className={classes.fieldTitle}>Abbreviation: {publication.BOOKTITLE}</h4>
                                ) : null}
                                <div>
                                    {(publication.VOLUME === undefined || publication.VOLUME === null) ? null : (
                                        <div>
                                            Volume: {publication.VOLUME}
                                        </div>
                                    )}
                                    {(publication.PAGES === undefined || publication.PAGES === null) ? null : (
                                        <div>
                                            Pages: {this.isJsonString(publication.PAGES) ? (
                                            JSON.parse(publication.PAGES).map(function (pages) {
                                                return (<span key={publication.PAGES.indexOf(pages)}>{pages};</span>)
                                            })) : (<span>{publication.PAGES};</span>)
                                        }
                                        </div>
                                    )}
                                </div>
                                <br/>
                            </ReactAux>
                        )
                        }
                    </div>
                    <div className={classNames(classes.column, classes.helper)}>
                        {(publication.EE === undefined || publication.EE === null) ? null : (
                            <ReactAux>
                                <div>
                                    <h4 className={classes.fieldTitle}>URL:</h4>
                                    {this.isJsonString(publication.EE) ?
                                        JSON.parse(publication.EE).map(function (ee) {
                                            return (<div key={publication.EE.indexOf(ee)}>{ee}</div>)
                                        }) : (<div>{publication.EE}</div>)}
                                </div>
                            </ReactAux>
                        )}
                        {(publication.AUTHOR === undefined || publication.AUTHOR === null) ? null : (
                            <ReactAux>
                                <Divider/>
                                <div>
                                    {publication.TYPE === 'book' || publication.TYPE === 'proceeding' ? (
                                        <h4 className={classes.fieldTitle}>Editors:</h4>) : (
                                        <h4 className={classes.fieldTitle}>Authors:</h4>)}
                                    {publication.AUTHOR.map(function (author) {
                                        return (<div key={publication.AUTHOR.indexOf(author)}>{author.NAME}</div>)
                                    })}
                                </div>
                            </ReactAux>
                        )}
                        {citations.length === 0 ? null : (<ReactAux>
                            <Divider/>
                            <div>
                                <h4 className={classes.fieldTitle}>Citation:</h4>
                                {citations.map(function (citation) {
                                    return (<div key={citations.indexOf(citation)}>{citation.NAME}</div>)
                                })}
                            </div>
                        </ReactAux>)}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

PublicationQueryResult.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {derivedSearch: state.derivedSearch};
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


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PublicationQueryResult));