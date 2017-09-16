import { observable, computed, action } from 'mobx';

export default class Limit {

    @observable categories = [];

    @observable name = '';

    @observable amount = 0;

    @observable calcForWeek = false;

    @observable calcForDay = false;

    @action toggleCategory = (category) => {
        if (this.categories.includes(category)) this.categories.remove(category);
        else this.categories.push(category);
    }

    @action toggleCalcForWeek = () => {
        this.calcForWeek = !this.calcForWeek;
    }

    @action toggleCalcForDay = () => {
        this.calcForDay = !this.calcForDay;
    }

    @action setName = (name) => {
        this.name = name;
    }

    @action setAmount = (amount) => {
        this.amount = amount;
    }

    constructor(limit) {
        const keys = Object.keys(limit);

        keys.forEach((key) => {
            this[key] = limit[key];
        });
    }

    @computed get amountForWeek() {
        return (this.amount / 30) * 7;
    }

    @computed get amountForDay() {
        return this.amount / 30;
    }

    @computed get hasCategories() {
        return this.categories.length > 0;
    }

    save() {
        const { categories, name, amount, calcForWeek, calcForDay } = this;
        return fetch('/api/limits', {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categories,
                name,
                amount,
                calcForWeek,
                calcForDay
            })
        });
    }

    hasCategory(category) {
        return this.categories.includes(category);
    }

    isValid(step) {
        let valid = false;

        switch (step) {
            case 0:
                valid = this.categories.length > 0;
                break;
            case 1:
                valid = !!this.name;
                break;
            case 2:
                valid = !!this.amount;
                break;
        }

        return valid;
    }
}
