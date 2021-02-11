
let start = document.getElementById('start');
let incomePlusBtn = document.querySelector('.income').querySelector('button');
let expensesPlusBtn = document.querySelector('.expenses').querySelector('button');
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let additionalIncomeItem1 = additionalIncomeItem[0];
let additionalIncomeItem2 = additionalIncomeItem[1];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelector('.income-items');
let incomeItemsAll = document.querySelectorAll('.income-items');
let expensesItemsAll = document.querySelectorAll('.expenses-items');
let expensesItems = document.querySelector('.expenses-items');
let expensesTitle = expensesItems.querySelector('.expenses-title');
let expensesAmount = expensesItems.querySelector('.expenses-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');


let appData = {
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    budjet: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function(){
        appData.budjet = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    addExpensesBlock: function(){
        let expensesItemsClone = expensesItems.cloneNode(true);
        expensesItems.parentNode.insertBefore(expensesItemsClone, expensesPlusBtn);
        expensesItemsAll = document.querySelectorAll('.expenses-items');
        if(expensesItemsAll.length >= 3){
            expensesPlusBtn.style.display = 'none';
        }

    },
    /**
     * 2 - Создать метод addIncomeBlock аналогичный addExpensesBlock
     */
    addIncomeBlock : function(){
        let incomeItemsClone = incomeItems.cloneNode(true);
        incomeItems.parentNode.insertBefore(incomeItemsClone, incomePlusBtn);
        incomeItemsAll = document.querySelectorAll('.income-items');
        if(incomeItemsAll.length >= 3){
            incomePlusBtn.style.display = 'none';
        }
    },
    getAddExpenses: function(){
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function (item) {
          item = item.trim();
        if(item !== ''){
            appData.addExpenses.push(item);
        }
      });
    },
    getExpenses: function(){
       expensesItemsAll.forEach(function (item) {
           let itemExpenses = item.querySelector('.expenses-title').value;
           let cashExpenses = item.querySelector('.expenses-amount').value;
           if(itemExpenses !== '' && cashExpenses !== ''){
               appData.expenses[itemExpenses] = +cashExpenses;
           }
       });
        for(let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
        console.log(appData.expensesMonth);
    },
    /**
     * 1 - Переписать метод getIncome аналогично getExpenses
     */
    getIncome: function(){
        incomeItemsAll.forEach(function (item) {
            let incomeItem = item.querySelector('.income-title').value;
            let incomeCash = item.querySelector('.income-amount').value;
            if(incomeItem !== '' && incomeCash !== ''){
                appData.income[incomeItem] = +incomeCash;
            }
        });
        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(',');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
        /**
         * 5 - Добавить обработчик события внутри метода showResult
         */
        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    getAddIncome: function(){
      additionalIncomeItem.forEach(function (item) {
        let itemVal = item.value.trim();
        if(itemVal !== ''){
            appData.addIncome.push(itemVal);
        }
      });
    },
    getBudget: function () {
        appData.budgetMonth =  +appData.budjet + +appData.incomeMonth - +appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value/this.budgetMonth);
    },
    getExpensesMonth: function () {
        // let amountAll = 0;
        // for(let key in appData.addExpenses){
        //     amountAll += +appData.addExpenses[key];
        // }
        return appData.expensesMonth;
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
    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;
    }
};
/**
 * 6 - Запретить нажатие кнопки Рассчитать пока поле Месячный доход пустой,
 * проверку поля Месячный доход в методе Start убрать.
 */
//Блокируем кнопку изначально
start.setAttribute('disabled', 'true');
//Разблокируем при вводе дохода, но если пользователь стёр, то заблокируем обратно
salaryAmount.addEventListener('input', function (e) {
    //console.log(salaryAmount.value[salaryAmount.value.length-1]);
    if(salaryAmount.value !== ''){
        start.removeAttribute('disabled');
    } else {
        start.setAttribute('disabled', 'true');
    }

});
//клик по кнопке "Рассчитать"
start.addEventListener('click', appData.start);
//клики по плюсикам
expensesPlusBtn.addEventListener('click', appData.addExpensesBlock);
incomePlusBtn.addEventListener('click', appData.addIncomeBlock);
/**
 * 4 -Число под полоской (input type range) должно меняться в зависимости от позиции range, используем событие input.
 */
periodSelect.addEventListener('input', function () {
    periodAmount.innerHTML = periodSelect.value;
});

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

console.log(appData);

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



