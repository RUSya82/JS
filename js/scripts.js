
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
    mission: 1000000,
    period: 3,
    budjet: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        addExpenses = addExpenses.toLowerCase().split(',');
        this.addExpenses = addExpenses.map((item) => {
            return item.trim();
        });
        this.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    getExpensesMonth: function () {
        let amountAll = 0;
        for(let key in this.expenses){
            amountAll += +this.expenses[key];
        }
        this.expensesMonth = amountAll;
        return amountAll;
    },
    getBudget: function () {
        this.budgetMonth =  this.budjet - this.getExpensesMonth();
        this.budgetDay = this.budgetMonth/30;
    },
    getTargetMonth: function () {
        if(this.budgetMonth > 0){
            return Math.ceil(this.mission/this.budgetMonth);
        }
        return -1;
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
    getExpensensies: function () {
        for(let i = 0; i < expensesCount; i++) {
            let temp = prompt('Введите обязательную статью расходов');
            this.expenses[temp] = getNumberFromUser('Во сколько это обойдется?');
        }
    }
};


appData.asking();


// спрашиваем обязательные статьи расходов и их величину
appData.getExpensensies();

//Расходы за месяц
console.log('Расходы за месяц: ' + appData.getExpensesMonth());

//Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth
appData.getBudget();

// Срок достижения цели
let message = (appData.getTargetMonth() > 0) ? (`Цель будет достигнута через ${appData.getTargetMonth()} месяцев`) : ('Цель не будет достигнута никогда, ищите другую работу!');
console.log(message);


console.log(`Бюджет на день: ${appData.budgetDay}`);

/*
    Написать конструкцию условий (расчеты приведены в рублях)
    Если budgetDay больше 1200, то “У вас высокий уровень дохода”
    Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”
    Если budgetDay меньше 600 и больше 0 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”
    Если отрицательное значение то вывести “Что то пошло не так”
    Учесть варианты 0, 600 и 1200 (к какому уровню не важно)
*/
console.log(appData.getStatusIncome(appData.budgetDay));

console.log("Наша программа включает в себя данные: ");
for (let key in appData){
    console.log(appData[key]);
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

