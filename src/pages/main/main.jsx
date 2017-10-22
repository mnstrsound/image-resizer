import React from 'react';
import cn from 'arui-feather/cn';

import SelectImages from '../../components/select-images';
import SettingsForm from '../../components/settings-form';

import './main.css';

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
                </div>
            </div>
        );
    }
}

export default Main;
