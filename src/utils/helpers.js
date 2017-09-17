function getRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function addZero(number) {
    return number < 10 ? `0${number}` : number.toString();
}

function getDate() {
    const today = new Date();
    const day = addZero(today.getDate());
    const month = addZero(today.getMonth() + 1);
    const year = addZero(today.getFullYear());
    let weekDay = today.getDay();
    weekDay = weekDay > 0 ? weekDay + 1 : 7;

    return {
        day,
        month,
        year,
        weekDay
    };
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
        'Метрополитен Кузьминки',
        'Парк Кузьминки',
        'Парк Горького',
        'Клуб Рокко',
        'Клуб SpecialPerson',
        'Кинотеатр Высота',
        'Кинотеатр Октябрь'
    ];
    for (let i = 0; i < transactionsCount; i++) {
        transactions.push({
            TransactionDate: generateTransactionDate(),
            TransactionSum: -getRandomNumber(50, 500),
            TransactionPlace: transactionPlaces[getRandomNumber(0, transactionPlaces.length)],
            TransactionCur: 'RUB'
        });
    }

    return transactions;
}

export function getPeriodByIndex(index) {
    let period;
    switch (index) {
        case 0:
            period = 'day';
            break;
        case 1:
            period = 'week';
            break;
        case 2:
            period = 'month';
            break;
    }

    return period;
}

export function getDayTransactions(transactions) {
    const { day, month, year } = getDate();

    return transactions.filter((transaction) => {
        const [transactionDay, transactionMonth, transactionYear] = transaction.TransactionDate.split('.');
        return transactionDay === day
            && transactionMonth === month
            && transactionYear === year;
    });
}

export function getWeekTransactions(transactions) {
    const { day, month, year, weekDay } = getDate();

    return transactions.filter((transaction) => {
        const [transactionDay, transactionMonth, transactionYear] = transaction.TransactionDate.split('.');
        return transactionDay <= day
            && transactionDay >= day - weekDay
            && transactionMonth === month
            && transactionYear === year;
    });
}

export function getMonthTransactions(transactions) {
    const { month, year } = getDate();

    return transactions.filter((transaction) => {
        const [transactionDay, transactionMonth, transactionYear] = transaction.TransactionDate.split('.');
        return transactionMonth === month
            && transactionYear === year;
    });
}

export function getTransactionsByPeriod(transactions, period) {
    let resultTransactions;
    switch (period) {
        case 'month':
            resultTransactions = getMonthTransactions(transactions);
            break;
        case 'week':
            resultTransactions = getWeekTransactions(transactions);
            break;
        case 'day':
            resultTransactions = getDayTransactions(transactions);
            break;
    }
    return resultTransactions;
}

export function getTransactionsTotalSum(transactions) {
    return transactions.reduce((acc, transaction) => (
        acc - transaction.TransactionSum
    ), 0);
}
