import React from 'react';
import Types from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import styles from './styles';

@withStyles(styles)
class CustomAppBar extends React.Component {
    static propTypes = {
        /** Звголовок */
        title: Types.string,
        /** Левый элемент */
        leftAddon: Types.node,
        /** Правый элемент */
        rightAddon: Types.node,
        /** CSS классы */
        classes: Types.shape({
            toolBar: Types.string,
            addon: Types.string
        })
    };

    render() {
        return (
            <AppBar
                position='fixed'
            >
                <Toolbar className={ this.props.classes.toolBar }>
                    <div className={ this.props.classes.addon }>
                        { this.props.leftAddon }
                    </div>
                    <Typography
                        type='subheading'
                        color='inherit'
                    >
                        { this.props.title }
                    </Typography>
                    <div className={ this.props.classes.addon }>
                        { this.props.rightAddon }
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default CustomAppBar;
