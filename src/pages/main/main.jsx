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
                <SettingsForm
                    className={ cn('settings-form') }
                />
                <SelectImages
                    className={ cn('select-images') }
                />
            </div>
        );
    }
}

export default Main;
