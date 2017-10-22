import React from 'react';
import { observer, inject } from 'mobx-react';
import cn from 'arui-feather/cn';

import SelectImages from '../../components/select-images';
import SettingsForm from '../../components/settings-form';

import './main.css';

@inject(({ appStore }) => ({ appStore }))
@observer
@cn('main')
class Main extends React.Component {
    render(cn) {
        return (
            <div className={ cn }>
                <div className={ cn('settings-form') }>
                    <SettingsForm />
                </div>
                <div className={ cn('select-images') }>
                    <SelectImages />
                    { this.renderImagesLengthInfo(cn) }
                    { this.renderImagesSizeInfo(cn) }
                    { this.renderResponseInfo(cn) }
                </div>
            </div>
        );
    }

    renderImagesLengthInfo(cn) {
        const { images } = this.props.appStore;
        return (
            <p className={ cn('info') }>
                Выбрано файлов: { images.length } / 20
            </p>
        );
    }

    renderImagesSizeInfo(cn) {
        const { imagesSize } = this.props.appStore;
        return (
            <p className={ cn('info') }>
                Размер: { imagesSize } MB / 100 MB
            </p>
        );
    }

    renderResponseInfo(cn) {
        const { error, link } = this.props.appStore;
        if (error) {
            return (
                <p className={ cn('info') }>
                    Ошибка: { error }
                </p>
            );
        }
        if (link) {
            return (
                <p className={ cn('info') }>
                    <a href={ link } target='blank'>Скачать архив</a>
                </p>
            );
        }
        return null;
    }
}

export default Main;
