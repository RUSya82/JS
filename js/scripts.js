
let money = 0;

let expensesCount = 2; //количество статей расходов, которые мы учитываем

// спрашиваем у пользователя месячный доход
function start(){
    money = getNumberFromUser('Введите свой месячный доход', 100000);
}
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 3,
    budjet: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        if(confirm('Есть ли у Вас дополнительный доход?')){
            let incomeItem = getStringFromUser('Введите источник дохода:', 'Таксую');
            //let incomeCash = getNumberFromUser('Сколько в месяц это приносит дохода?', 10000);
            this.income[incomeItem] = getNumberFromUser('Сколько в месяц это приносит дохода?', 10000);
        }
        let addExpenses = getStringFromUser('Перечислите возможные расходы за рассчитываемый период через запятую');
        addExpenses = addExpenses.toLowerCase().split(',');
        this.addExpenses = addExpenses.map((item) => {
            return item.trim();
        });
        this.deposit = confirm('Есть ли у вас депозит в банке?');

        for(let i = 0; i < expensesCount; i++) {
            let temp = getStringFromUser('Введите обязательную статью расходов');
            this.expenses[temp] = getNumberFromUser('Во сколько это обойдется?');
        }

    },
    getBudget: function () {
        this.budgetMonth =  this.budjet - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth/30);
    },
    getTargetMonth: function () {
        if(this.budgetMonth > 0){
            return Math.ceil(this.mission/this.budgetMonth);
        }
        return -1;
    },
    getExpensesMonth: function () {
        let amountAll = 0;
        for(let key in this.expenses){
            amountAll += +this.expenses[key];
        }
        this.expensesMonth = amountAll;
    },
    getStatusIncome: function () {
        if(this.budgetDay >= 1200){
            return 'У вас высокий уровень дохода';
        } else if((this.budgetDay < 1200) && (this.budgetDay >= 600)) {
            return 'У вас средний уровень дохода';
        } else if((this.budgetDay > 0) && (this.budgetDay < 600)) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    },
    getInfoDeposit: function () {
        if(appData.deposit){
            this.percentDeposit = getNumberFromUser("Какой процент депозита?", 10);
            this.moneyDeposit = getNumberFromUser("Какой размер депозита?", 100000);
        }
    },
    calcSavedMoney: function () {
        return this.budgetMonth * this.period;
    }
};


appData.asking();

appData.getExpensesMonth();

/*
    Возможные расходы (addExpenses) вывести строкой в консоль каждое слово
    с большой буквы слова разделены запятой и пробелом
    Пример (Интернет, Такси, Коммунальные расходы)
*/
let addExpensesToString = appData.addExpenses.map( function (item) {
   return item[0].toUpperCase() + item.slice(1);
}).join(', ');
console.log(addExpensesToString);

//Расходы за месяц
console.log('Расходы за месяц: ' + appData.expensesMonth);

//Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth
appData.getBudget();

// Срок достижения цели
let message = (appData.getTargetMonth() > 0) ? (`Цель будет достигнута через ${appData.getTargetMonth()} месяцев`) : ('Цель не будет достигнута никогда, ищите другую работу!');
console.log(message);


console.log(`Бюджет на день: ${appData.budgetDay}`);



console.log("Наша программа включает в себя данные: ");
for (let key in appData){
    console.log(`${key} : ` + appData[key]);
}



// ---------------------------------------------- functions  --------------------------------------
/**
 * Проверяет можно ли преобразовать переменную в число
 * ВНИМАИЕ!!! Не меняет само число, а возвращает только bool
 * @param number
 * @returns {boolean|boolean}
 */
function isNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
}

/**
 * Получает число от пользователя, если пользователь ввёл не число, то переспрашивает
 * @param message
 * @param defaultValue
 * @returns {number}
 */
function getNumberFromUser(message, defaultValue){
    let moneyTemp = 0;
    let defaultValueTemp = isNumber(defaultValue) ? defaultValue : '';
    do{
        moneyTemp = parseFloat(prompt(message, defaultValueTemp));
    } while (!isNumber(moneyTemp));
    return moneyTemp;
}

/**
 * Получает строку от пользователя, если пользователь ввёл не строку, то переспрашивает
 * @param message
 * @param defaultValue
 * @returns {string}
 */
function getStringFromUser(message, defaultValue) {
    let userString = '';
    let defaultValueTemp = defaultValue ? String(defaultValue) : '';
    do{
        userString = prompt(message, defaultValueTemp);

    } while (isNumber(userString) || (!userString));
    return userString.trim();
}

