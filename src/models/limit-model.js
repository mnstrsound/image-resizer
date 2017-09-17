import { observable, computed, action } from 'mobx';
import LimitsService from '../services/limits-service';

export default class LimitModel {
    @observable cardId = '';

    @observable categoriesIds = [];

    @observable name = '';

    @observable amount = 0;

    @observable calcForWeek = false;

    @observable calcForDay = false;

    @action toggleCategoryId = (categoryId) => {
        if (this.categoriesIds.includes(categoryId)) this.categoriesIds.remove(categoryId);
        else this.categoriesIds.push(categoryId);
    }

    @action toggleCalcForWeek = () => {
        this.calcForWeek = !this.calcForWeek;
    }

    @action toggleCalcForDay = () => {
        this.calcForDay = !this.calcForDay;
    }

    @action setCardId = (cardId) => {
        this.cardId = cardId;
    }

    @action setName = (name) => {
        this.name = name;
    }

    @action setAmount = (amount) => {
        this.amount = amount;
    }

    constructor(params) {
        if (params) {
            Object.keys(params).forEach((prop) => {
                this[prop] = params[prop];
            });
        }
    }

    @computed get amountForWeek() {
        return ((this.amount / 30) * 7).toFixed(2);
    }

    @computed get amountForDay() {
        return (this.amount / 30).toFixed(2);
    }

    update() {
        const { _id, cardId, categoriesIds, name, amount, calcForWeek, calcForDay } = this;
        return LimitsService.saveLimit({
            _id,
            cardId,
            categoriesIds,
            name,
            amount,
            calcForWeek,
            calcForDay
        });
    }

    save() {
        const { cardId, categoriesIds, name, amount, calcForWeek, calcForDay } = this;
        return LimitsService.saveLimit({
            cardId,
            categoriesIds,
            name,
            amount,
            calcForWeek,
            calcForDay
        });
    }

    hasCategory(categoryId) {
        return this.categoriesIds.includes(categoryId);
    }

    isValid(step) {
        let valid = false;

        switch (step) {
            case 0:
                valid = this.cardId.length > 0;
                break;
            case 1:
                valid = this.categoriesIds.length > 0;
                break;
            case 2:
                valid = !!this.name;
                break;
            case 3:
                valid = !!this.amount;
                break;
        }

        return valid;
    }
}
