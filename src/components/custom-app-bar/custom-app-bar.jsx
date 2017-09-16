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
        rightAddon: Types.node
    };

    render() {
        return (
            <AppBar
                className={ this.props.classes.appBar }
                position='fixed'
            >
                <Toolbar className={ this.props.classes.toolBar }>
                    { this.props.leftAddon }
                    <Typography
                        type='subheading'
                        color='inherit'
                    >
                        { this.props.title }
                    </Typography>
                    { this.props.rightAddon }
                </Toolbar>
            </AppBar>
        );
    }
}

export default CustomAppBar;