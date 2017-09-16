import React from 'react';
import Types from 'prop-types';
import { MenuItem } from 'material-ui/Menu';

class Option extends React.Component {
    static propTypes = {
        /** Текст внутри */
        text: Types.string,
        /** Обработчик клика */
        onClick: Types.func,
        /** Обработчик закрытия */
        onClose: Types.func
    };

    handleMenuItemClick = () => {
        const { onClose, onClick } = this.props;
        onClick();
        onClose();
    };

    render() {
        const { text } = this.props;
        return (
            <MenuItem onClick={ this.handleMenuItemClick } >
                { text }
            </MenuItem>
        );
    }
}

export default Option;
