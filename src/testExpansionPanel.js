import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {ListItem, ListItemText} from 'material-ui/List';
import Tloader from 'react-touch-loader';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    scroll: {
        height: '50vh',
        overflow: 'auto',
    }
});
let base=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function generate(element) {
    return base.map(value =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

function InsetList(props) {
    const {classes} = props;
    let hasMore=true;
    return (
        <Tloader
            initializing={0}
            onRefresh={function () {
                setTimeout(2000);
                base.concat([21,22,23,24,25]);
                console.log('onRefresh')
            }}
            hasMore={hasMore}
            onLoadMore={function () {
                var promise1 = Promise.resolve([1, 2, 3]);
                base=base.concat([21,22,23,24,25]);
                console.log(base);
                promise1.then(function () {
                    console.log(hasMore);
                });
            }}
            autoLoadMore={true}
            className={classes.scroll}>
            {generate(
                <ListItem>
                    <ListItemText
                        primary="Single-line item.................................................................................."
                        secondary={false ? 'Secondary text' : null}
                    />
                </ListItem>,
            )}
        </Tloader>
    );
}

InsetList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetList);