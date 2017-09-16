import React from 'react';
import Types from 'prop-types';
import Menu from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';

import Option from './option';

class ActionButton extends React.Component {
    static propTypes = {
        /** Элементы меню */
        options: Types.arrayOf(Types.shape({}))
    };

    state = {
        anchorEl: undefined,
        open: false
    };

    handleClick = (event) => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <MoreVertIcon
                    onClick={ this.handleClick }
                />
                <Menu
                    id='long-menu'
                    anchorEl={ this.state.anchorEl }
                    open={ this.state.open }
                    onRequestClose={ this.handleRequestClose }
                >
                    { this.props.options.map(option => (
                        <Option
                            key={ option.text }
                            text={ option.text }
                            onClick={ option.handler }
                            onClose={ this.handleRequestClose }
                        />
                    )) }
                </Menu>
            </div>
        );
    }
}

export default ActionButton;
