
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
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
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


// appData.asking();
//
// appData.getExpensesMonth();

/*
    Возможные расходы (addExpenses) вывести строкой в консоль каждое слово
    с большой буквы слова разделены запятой и пробелом
    Пример (Интернет, Такси, Коммунальные расходы)
*/
// let addExpensesToString = appData.addExpenses.map( function (item) {
//    return item[0].toUpperCase() + item.slice(1);
// }).join(', ');
// console.log(addExpensesToString);

//Расходы за месяц
// console.log('Расходы за месяц: ' + appData.expensesMonth);

//Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth
// appData.getBudget();

// Срок достижения цели
// let message = (appData.getTargetMonth() > 0) ? (`Цель будет достигнута через ${appData.getTargetMonth()} месяцев`) : ('Цель не будет достигнута никогда, ищите другую работу!');
// console.log(message);


// console.log(`Бюджет на день: ${appData.budgetDay}`);
//
//
//
// console.log("Наша программа включает в себя данные: ");
// for (let key in appData){
//     console.log(`${key} : ` + appData[key]);
// }



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
        userString = prompt(message, defaultValueTemp).trim();
    } while (isNumber(userString) || (userString.length === 0));
    return userString;
}

//------------------------------ Lesson09 ----------------------------------------------------------


//--Кнопку "Рассчитать" через id
let startBtn = document.getElementById('start');
console.log(startBtn);



//--Кнопки “+” (плюс) через Tag, каждую в своей переменной.
//------------------------------ Так? -----------------------------------------
let incomePlusBtn = document.querySelector('.income').querySelector('button');
console.log(incomePlusBtn);

let expensesPlusBtn = document.querySelector('.expenses').querySelector('button');
console.log(expensesPlusBtn);
//------------------   Или так? ---------------------------------------------
let incomePlusBtn2 = document.getElementsByTagName('button')[0];
console.log(incomePlusBtn2);

let expensesPlusBtn2 = document.getElementsByTagName('button')[1];
console.log(expensesPlusBtn2);



//--Чекбокс по id через querySelector
let depositCheck = document.querySelector('#deposit-check');
console.log(depositCheck);



//--Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
//------------------    Так и не понял в разныx переменные их надо, или в коллекцию -----------
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
console.log(additionalIncomeItem);
//------------------    Если поотдельности, то :
let additionalIncomeItem1 = additionalIncomeItem[0];
let additionalIncomeItem2 = additionalIncomeItem[1];
console.log(additionalIncomeItem1);
console.log(additionalIncomeItem2);


/*
* Каждый элемент в правой части программы через класс(не через querySelector),
* которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">
* */
//-----------------------    budget_month-value я так понимаю не надо пока?
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
console.log(budgetDayValue);

let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
console.log(expensesMonthValue);

let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
console.log(additionalIncomeValue);

let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
console.log(additionalExpensesValue);

let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
console.log(incomePeriodValue);

let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
console.log(targetMonthValue);


/**
 * Оставшиеся поля через querySelector каждый в отдельную переменную:
 * поля ввода (input) с левой стороны и не забудьте про range.
 */
let salaryAmount = document.querySelector('.salary-amount');
console.log(salaryAmount);

let incomeItems = document.querySelector('.income-items');
let incomeTitle = incomeItems.querySelector('.income-title');
console.log(incomeTitle);
let incomeAmount = incomeItems.querySelector('.income-amount');
console.log(incomeAmount);


let expensesItems = document.querySelector('.expenses-items');
let expensesTitle = expensesItems.querySelector('.expenses-title');
console.log(expensesTitle);
let expensesAmount = expensesItems.querySelector('.expenses-amount');
console.log(expensesAmount);


let additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log(additionalExpensesItem);


let targetAmount = document.querySelector('.target-amount');
console.log(targetAmount);

let periodSelect = document.querySelector('.period-select');
console.log(periodSelect);
