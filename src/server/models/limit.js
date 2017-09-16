import { getConnection } from '../mongo';

const mongoose = getConnection();
const Schema = mongoose.Schema;

const limitSchema = new Schema({
    cardId: String,
    categoriesIds: Array,
    name: String,
    amount: String,
    calcForWeek: Boolean,
    calcForDay: Boolean
});

const LimitModel = mongoose.model('Limit', limitSchema);

export default LimitModel;
