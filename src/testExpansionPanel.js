import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';

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
});

class ControlledExpansionPanels extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography className={classes.heading}>type</Typography>
                    <Typography className={classes.secondaryHeading}>publication Title</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Some more information.
                        Publication's author, year, its cited publications, publications that cite it its parent
                        publication.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

ControlledExpansionPanels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);