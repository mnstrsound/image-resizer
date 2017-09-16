import { getConnection } from '../mongo';

const mongoose = getConnection();
const  Schema = mongoose.Schema;

const limitSchema = new Schema({
    cardId: String,
    categoriesIds: Array,
    name: String,
    amount: String,
    calcForWeek: Boolean,
    calcForDay: Boolean
});

export default mongoose.model('Limit', limitSchema);
