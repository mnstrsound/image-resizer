import { action, observable, computed } from 'mobx';
import Limit from '../models/limit';

class Create {
    @action setLimitToEdit(limit) {
        this.limit = limit || new Limit();
    }
}

export default Create;
