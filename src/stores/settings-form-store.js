import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import validator from 'validator';

import Rules from '../validation/rules';

const isRequiredIf = (path, value) => ({ field, form, validator: { isEmpty } }) => {
    const pathValue = form.select(path).get('value');
    let isRequired;

    if (typeof value === 'function') {
        isRequired = value(pathValue);
    } else {
        isRequired = form.select(path).get('value') === value;
    }

    if (isRequired) {
        return [!isEmpty(field.get('value').toString()), 'Обязательное поле'];
    }
    return true;
};
const isBetween = (min, max) => ({ field, validator: { isInt } }) => {
    const value = field.get('value').toString();
    return [isInt(value, { min, max }), `Положительное число между ${min} и ${max}`];
};


const plugins = { dvr: validatorjs };
const fields = [
    {
        name: 'resize',
        label: 'Размеры',
        fields: [
            {
                name: 'width',
                label: 'Ширина (px)',
                type: 'number',
                value: 1000,
                rules: Rules.resize.width
            },
            {
                name: 'height',
                label: 'Высота (px)',
                type: 'number',
                value: 1000,
                rules: Rules.resize.height
            },
            {
                name: 'crop',
                label: 'Обрезать',
                type: 'checkbox',
                value: true,
                rules: Rules.resize.crop
            }
        ]
    },
    {
        name: 'preview',
        label: 'Миниатюра',
        fields: [
            {
                name: 'width',
                label: 'Ширина (px)',
                type: 'number',
                value: 100,
                rules: Rules.preview.width
            },
            {
                name: 'height',
                label: 'Высота (px)',
                type: 'number',
                value: 100,
                rules: Rules.preview.height
            },
            {
                name: 'postfix',
                label: 'Постфикс',
                type: 'text',
                value: '',
                rules: Rules.preview.postfix
            },
            {
                name: 'use',
                label: 'Создать',
                type: 'checkbox',
                value: true,
                rules: Rules.preview.use
            }
        ]
    },
    {
        name: 'watermark',
        label: 'Водяной знак',
        fields: [
            {
                name: 'image',
                label: 'Изображение',
                value: null,
                rules: Rules.watermark.image
            },
            {
                name: 'opacity',
                label: 'Прозрачность',
                type: 'number',
                value: 50,
                rules: Rules.watermark.opacity
            },
            {
                name: 'size',
                label: 'Размер',
                type: 'number',
                value: 50,
                rules: Rules.watermark.size
            },
            {
                name: 'positionX',
                label: 'Положение (ось X)',
                value: 'CENTER',
                extra: {
                    positions: [
                        'LEFT',
                        'CENTER',
                        'RIGHT'
                    ]
                },
                rules: Rules.watermark.positionX
            },
            {
                name: 'positionY',
                label: 'Положение (ось Y)',
                value: 'CENTER',
                extra: {
                    positions: [
                        'TOP',
                        'CENTER',
                        'BOTTOM'
                    ]
                },
                rules: Rules.watermark.positionY
            }
        ]
    },
    {
        name: 'naming',
        label: 'Наименование',
        fields: [
            {
                name: 'prefix',
                label: 'Префикс',
                type: 'text',
                value: '',
                rules: Rules.naming.prefix
            },
            {
                name: 'indexation',
                label: 'Индексация',
                type: 'number',
                value: 0,
                rules: Rules.naming.indexation
            },
            {
                name: 'format',
                label: 'Постфикс',
                value: 'JPG',
                extra: {
                    formats: [
                        'JPG',
                        'PNG'
                    ]
                },
                rules: Rules.naming.format
            }
        ]
    }
];

const observers = {
    preview: {
        use: [{
            key: 'value',
            call: ({ form, change }) => {
                const relatedFieldsPaths = [
                    'preview.width',
                    'preview.height',
                    'preview.postfix'
                ];

                form.select('preview.width').set('disabled', !change.newValue);
                form.select('preview.height').set('disabled', !change.newValue);
                form.select('preview.postfix').set('disabled', !change.newValue);

                //     console.log(form.select(fieldPath));
                //     form.select(fieldPath).set('disabled', !change.newValue);
                // });
            }
        }]
    }
}

const hooks = {
    onSuccess(form) {
        alert('Form is valid! Send the request here.');
        // get field values
        console.log('Form Values!', form.values());
        return false;
    },
    onError(form) {
        alert('Form has errors!');
        // get all form errors
        console.log(form.values())
        console.log('All form errors', form.errors());
        return false;
    }
}
export default new MobxReactForm({ observers, fields }, { plugins, hooks });
