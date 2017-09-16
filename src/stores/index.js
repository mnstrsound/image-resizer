import { RouterStore } from 'mobx-react-router';
import CategoriesStore from './categories-store';
import LimitsStore from './limits-store';
import CardsStore from './cards-store';
import TransactionsStore from './transactions-store';

export default state => ({
    categoriesStore: new CategoriesStore(state.categories),
    limitsStore: new LimitsStore(),
    cardsStore: new CardsStore(state.cards),
    transactionsStore: new TransactionsStore(state.transactions),
    routerStore: new RouterStore()
});
