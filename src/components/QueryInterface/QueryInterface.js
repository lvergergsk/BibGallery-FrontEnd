// React:
import React, {Component} from 'react';
import PropTypes from 'prop-types';
// Material-UI
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Tabs, {Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
// Other:
import PublicationQueryResults from '../QueryResults/PublicationQueryResults';
import AuthorQueryResults from '../QueryResults/AuthorQueryResults';
import QueryControls from '../QueryControls/QueryControls';
import {connect} from "react-redux";
import DerivedQueryResults from '../QueryResults/DerivedQueryResults';
import * as actions from '../../store/actions'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
    },
    button: {
        padding: 5,
    },
    tab: {
        width: '30%',
    },
    queryCount: {
        marginLeft: '15px',
        color: 'grey',
        fontSize: '10px',
        textTransform: 'lowercase',
        display: 'inline-block',
    }
});

class QueryInterface extends Component {


    handleChange = (event, value) => {
        this.props.onSetTabNumber(value);
    };

    render() {
        const {classes, tabNumber} = this.props;
        return (
            <div className={classes.root}>
                {/*<ProtectedRoute/>*/}
                <Grid container spacing={24}>
                    <Grid item xs={9} sm={9}>
                        <Paper>
                            <Tabs
                                className={classes.tabs}
                                value={this.props.tabNumber}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary">
                                <Tab className={classes.tab} label={
                                    <div>Publication
                                        {(this.props.publicationCount === undefined ||
                                            this.props.publicationCount === null) ? null :
                                            <span
                                                className={classes.queryCount}>{this.props.publications.length} of {this.props.publicationCount}</span>}</div>}/>
                                <Tab className={classes.tab} label={
                                    <div>Authors
                                        {(this.props.authorCount === undefined ||
                                            this.props.authorCount === null) ? null :
                                            <span
                                                className={classes.queryCount}>{this.props.authors.length} of {this.props.authorCount}</span>}</div>}/>
                                {this.props.derivedResultTabTitle === undefined ? null : (
                                    <Tab className={classes.tab} label={
                                        <div>{this.props.derivedResultTabTitle}
                                            {(this.props.derivedResultsCount === undefined ||
                                                this.props.derivedResultsCount === null) ? null :
                                                <span
                                                    className={classes.queryCount}>{this.props.derivedResults.length} of {this.props.derivedResultsCount}</span>}</div>}/>)}


                            </Tabs>
                        </Paper>
                        {tabNumber === 0 && <PublicationQueryResults searchPublication={this.props.searchPublication}/>}
                        {tabNumber === 1 && <AuthorQueryResults searchAuthor={this.props.searchAuthor}/>}
                        {tabNumber === 2 && <DerivedQueryResults/>}

                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <QueryControls display={tabNumber}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

QueryInterface.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {
        publicationCount: state.publicationCount,
        derivedResultsCount: state.derivedResultsCount,
        publications: state.publications,
        derivedResults: state.derivedResults,
        tabNumber: state.tabNumber,
        derivedResultTabTitle: state.derivedResultTabTitle,
        authors:state.authors,
        authorCount:state.authorCount,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetTabNumber: (tabNumber) => dispatch({type: actions.SETTABNUMBER, tabNumber: tabNumber})
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(QueryInterface));