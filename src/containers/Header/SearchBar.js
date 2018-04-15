import React from "react";
import {withStyles} from "material-ui/styles/index";
import {Button, Input} from "material-ui";


const styles = {
    search: {
        minWidth:'300px',
        width: '1000px',
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
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '20px'
    },
    icon: {
        padding: '5px'
    }
};

class SearchBar extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.search}>
                <Input type="text" className={classes.searchTerm} placeholder="Search"/>
                <Button type="submit" className={classes.searchButton}>
                    <i className="material-icons">search</i>
                </Button>
            </div>

        );
    }
}

export default withStyles(styles)((SearchBar));