import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary,} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import classNames from 'classnames'
import Divider from 'material-ui/Divider';
import ReactAux from '../../hoc/ReactAux/ReactAux'

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
            });
        } catch (e) {
            return false;
        }
        return true;
    }

    render() {
        const {classes, publication} = this.props;
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
                                <h4 className={classes.fieldTitle}>Parent publication:</h4>
                                <div style={{textAlign: 'left', marginLeft: '30%',}}>
                                    {(publication.ID === undefined || publication.ID === null) ? null : (
                                        <div>
                                            Publication Id: {publication.ID}
                                        </div>
                                    )}
                                    {(publication.JOURNAL === undefined || publication.JOURNAL === null) ? null : (
                                        <div>
                                            Journal: {publication.JOURNAL}
                                        </div>)}
                                    {(publication.BOOKTITLE === undefined || publication.BOOKTITLE === null) ? null : (
                                        <div>
                                            Book: {publication.BOOKTITLE}
                                        </div>
                                    )}
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
                        {(publication.URL === undefined || publication.URL === null) ? null : (
                            <ReactAux>
                                <div>
                                    <h4 className={classes.fieldTitle}>URL:</h4>
                                    {this.isJsonString(publication.URL) ?
                                        JSON.parse(publication.URL).map(function (url) {
                                            return (<div key={publication.URL.indexOf(url)}>{url}</div>)
                                        }) : (<div>{publication.URL}</div>)}
                                </div>
                            </ReactAux>
                        )}
                        {(publication.AUTHOR === undefined || publication.AUTHOR === null) ? null : (
                            <ReactAux>
                                <Divider/>
                                <div>
                                    <h4 className={classes.fieldTitle}>Author:</h4>
                                    {publication.AUTHOR.map(function (author) {
                                        return (<div key={publication.AUTHOR.indexOf(author)}>{author}</div>)
                                    })}
                                </div>
                            </ReactAux>
                        )}
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