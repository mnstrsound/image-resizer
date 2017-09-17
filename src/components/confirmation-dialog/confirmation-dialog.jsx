import React from 'react';
import Types from 'prop-types';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class ConfirmationDialog extends React.Component {
    static propTypes = {
        /** Заголовок окна */
        title: Types.string,
        /** Контент внутри окна */
        children: Types.node,
        /** Обработчик закрытия */
        onClose: Types.func,
        /** Обработчик подтверждения */
        onConfirm: Types.func
    }

    render() {
        return (
            <Dialog
                ignoreBackdropClick={ true }
                ignoreEscapeKeyUp={ true }
                maxWidth='xs'
                { ...this.props }
            >
                <DialogTitle>{ this.props.title }</DialogTitle>
                <DialogContent>
                    { this.props.children }
                </DialogContent>
                <DialogActions>
                    <Button
                        color='primary'
                        onClick={ this.props.onClose }
                    >
                        Закрыть
                    </Button>
                    <Button
                        color='primary'
                        onClick={ this.props.onConfirm }
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ConfirmationDialog;
