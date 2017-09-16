import { action, observable } from 'mobx';

import LimitsService from '../services/limits-service';
import NavigationController from '../controllers/navigation-controller';
import Limit from '../models/limit-model';

class LimitsStore {
    @observable limits = [];

    @action getLimits = () => {
        LimitsService.getLimits().then((limits) => {
            this.limits = limits.map(limit => new Limit(limit));
        });
    }

    @action deleteLimit = (id) => {
        LimitsService.deleteLimit(id).then(() => { NavigationController.toMainScreen(); });
    }
}

export default LimitsStore;
