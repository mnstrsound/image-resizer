import { grey, amber } from 'material-ui/colors';

export default {
    limit: {
        padding: '154px 12px 0'
    },
    limitItem: {
        height: 98,
        backgroundColor: amber[100],
        position: 'fixed',
        top: 56,
        left: 0,
        right: 0,
        padding: '0 12px'
    },
    transactions: {
        height: 'calc(100vh - 154px)',
        overflowY: 'auto'
    },
    transactionsGroup: {
        marginTop: 12
    },
    transactionsDate: {
        padding: '2px 5px',
        backgroundColor: grey[100]
    }
};
