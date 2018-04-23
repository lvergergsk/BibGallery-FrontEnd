import React from "react";
import {withStyles} from "material-ui/styles/index";
import {Button, Input} from "material-ui";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import * as actions from '../../store/actions'

const styles = {
    search: {
        marginLeft: 'auto',
        minWidth: '300px',
        width: '800px',
        position: 'relative'
    },
    searchTerm: {
        width: '100%',
        padding: '5px',
        marginRight: '0px',
        height: '100%',
        borderRadius: '5px',
        outline: 'none',
    },
    searchButton: {
        position: 'absolute',
        height: '100%',
        textAlign: 'center',
        fontSize: '20px',
        marginLeft: '10px',
    },
    icon: {
        padding: '5px'
    }
};


class SearchBar extends React.Component {

    handleChange(event) {
        this.props.onSetKeyword(event.target.value)
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.search}>
                <Input type="text" className={classes.searchTerm} placeholder="Search"
                       onChange={this.handleChange.bind(this)}/>
                <Button onClick={this.props.onClickSearch} type="submit" className={classes.searchButton}>
                    <i className="material-icons">search</i>
                </Button>
            </div>
        );
    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
    return {
        keyword: state.keyword
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetKeyword: (keyword) => dispatch({type: actions.SETKEYWORD, keyword: keyword}),
    };

};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchBar));