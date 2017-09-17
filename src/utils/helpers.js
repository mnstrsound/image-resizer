

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function addZero(number) {
    return number < 10 ? `0${number}` : number;
}

function generateTransactionDate() {
    const today = new Date();
    const dayNumber = addZero(getRandomNumber(1, today.getDate()));
    const monthNumber = addZero(today.getMonth() + 1);

    return `${dayNumber}.${monthNumber}.${today.getFullYear()}`;
}

export function generateTransactions() {
    const transactions = [];
    const transactionsCount = getRandomNumber(20, 50);
    const transactionPlaces = [
        'АЗС Лукойл',
        'АЗС Газпромнефть',
        'Кафе Шоколадница',
        'Ресторан Макдональдс',
        'Кафе Парус',
        'Банкомат Открытие',
        'Банкомат Альфа-банк',
        'Магазин Триал-Спорт',
        'Магазин Nike'
    ];
    for (let i = 0; i < transactionsCount; i++) {
        transactions.push({
            TransactionDate: generateTransactionDate(),
            TransactionSum: -getRandomNumber(100, 1000),
            TransactionPlace: transactionPlaces[getRandomNumber(0, transactionPlaces.length)],
            TransactionCur: 'RUB'
        });
    }

    return transactions;
}

export function getDayTransactions(transactions) {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return transactions.filter((transaction) => {
        const [transactionDay, transactionMonth, transactionYear] = transaction.TransactionDate.split('.');
        return transactionDay === day
            && transactionMonth === month
            && transactionYear === year;
    });
}

export function getWeeyTransactions(transactions) {
    const today = new Date();
    const day = today.getDate();
    const weekDay = today.getDay();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return transactions.filter((transaction) => {
        const [transactionDay, transactionMonth, transactionYear] = transaction.TransactionDate.split('.');
        return transactionDay <= day
            && transactionDay >= day - weekDay
            && transactionMonth === month
            && transactionYear === year;
    });
}

export function getMonthTransactions(transactions) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return transactions.filter((transaction) => {
        const [transactionDay, transactionMonth, transactionYear] = transaction.TransactionDate.split('.');
        return transactionMonth === month
            && transactionYear === year;
    });
}

export function getTransactionsTotalSum(transactions) {
    return transactions.reduce((acc, transaction) => (
        acc - transaction.TransactionSum
    ), 0);
}
