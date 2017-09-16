import { action, observable } from 'mobx';
import Limit from '../models/limit';

class Limits {
    @observable limits = [];

    @action getLimits = () => {
        const defaultLimits = [
            {
                id: 1,
                cardId: 42,
                name: 'Первый лимит',
                calcForDay: false,
                calcForWeek: false,
                amount: '',
                categories: [
                    { title: 'Питание' },
                    { title: 'Одежда' }
                ]
            }
        ];
        defaultLimits.forEach((item) => {
            this.limits.push(new Limit(item));
        });
    }
}

export default Limits;
