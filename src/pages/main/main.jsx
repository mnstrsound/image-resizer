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
        const { link } = this.props.appStore;
        return (
            <div className={ cn }>
                <div className={ cn('settings-form') }>
                    <SettingsForm />
                </div>
                <div className={ cn('select-images') }>
                    <SelectImages />
                    <p className={ cn('download-link') }>
                        { link && <a href={ link } target='blank'>Скачать архив</a> }
                    </p>
                </div>
            </div>
        );
    }
}

export default Main;
