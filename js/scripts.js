
let start = document.getElementById('start');
let cancel = document.getElementById('cancel');
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
let data = document.querySelector('.data');


/**
 * Поля с placeholder="Наименование" разрешить ввод только русских букв пробелов и знаков препинания
 * @type {NodeListOf<Element>}
 */
let textInputs = document.querySelectorAll('input[placeholder="Наименование"]');
textInputs.forEach(function (item) {
    validTextInput(item);
});
/**
 *  Поля с placeholder="Сумма" разрешить ввод только цифр
 * @type {NodeListOf<Element>}
 */
let numberInputs = document.querySelectorAll('input[placeholder="Сумма"]');
numberInputs.forEach(function (item) {
    validNumberInput(item);
});

//Объект клон
let appDataClone = {};

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
        startBind.call(appData);                //привязка
        function startBind() {
            this.budjet = +salaryAmount.value;
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getBudget();
            this.showResult();
            this.blockInputs();
        }
        this.style.display= 'none';
        cancel.style.display = 'block';

    },
    reset: function(){
        Object.assign(appData, appDataClone);
        resetBind.call(appData);            //привязка
        function resetBind(){
            this.resetInputs();
            this.removeIncomes();
            this.removeExpenses();
            this.unblockInputs();
            periodSelect.value = 1;
            periodAmount.textContent = '1';
        }
        this.style.display= 'none';
        start.style.display = 'block';

    },
    blockInputs: function() {
        let textInputs = data.querySelectorAll('input[type=text]');
        textInputs.forEach(item => {
            item.setAttribute('disabled', 'true');
        });
    },
    unblockInputs: function() {
        let textInputs = data.querySelectorAll('input[type=text]');
        textInputs.forEach(item => {
            item.removeAttribute('disabled');
        });
    },
    resetInputs: function(){
        let textInputs = document.querySelectorAll('input[type=text]');
        textInputs.forEach(item => {
            item.value = '';
        });
    },
    removeIncomes: function(){
        let incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach((item, index) => {
            if(index !== 0){
                item.remove();
            }
        });
    },
    removeExpenses: function(){
        let expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach((item, index) => {
            if(index !== 0){
                item.remove();
            }
        });
    },
    addExpensesBlock: function(){
        let expensesItemsClone = expensesItems.cloneNode(true);
        clearInputs(expensesItemsClone);
        expensesItems.parentNode.insertBefore(expensesItemsClone, expensesPlusBtn);
        //навешиваем валидаторы на новые инпуты
        validTextInput(expensesItemsClone.querySelector('.expenses-title'));
        validNumberInput(expensesItemsClone.querySelector('.expenses-amount'));
        expensesItemsAll = document.querySelectorAll('.expenses-items');
        if(expensesItemsAll.length >= 3){
            expensesPlusBtn.style.display = 'none';
        }

    },

    addIncomeBlock : function(){
        let incomeItemsClone = incomeItems.cloneNode(true);
        clearInputs(incomeItemsClone);
        incomeItems.parentNode.insertBefore(incomeItemsClone, incomePlusBtn);
        //навешиваем валидаторы на новые инпуты
        validTextInput(incomeItemsClone.querySelector('.income-title'));
        validNumberInput(incomeItemsClone.querySelector('.income-amount'));
        incomeItemsAll = document.querySelectorAll('.income-items');
        if(incomeItemsAll.length >= 3){
            incomePlusBtn.style.display = 'none';
        }
    },
    getAddExpenses: function(){
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach( (item) => {
          item = item.trim();
        if(item !== ''){
            this.addExpenses.push(item);
        }
      });
    },
    getExpenses: function(){
        //console.log(this);
       expensesItemsAll.forEach( (item) =>  {
           let itemExpenses = item.querySelector('.expenses-title').value;
           let cashExpenses = item.querySelector('.expenses-amount').value;
           if(itemExpenses !== '' && cashExpenses !== ''){
               this.expenses[itemExpenses] = +cashExpenses;
           }
       });
        for(let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    },
    getIncome: function(){
        incomeItemsAll.forEach( (item) =>{
            let incomeItem = item.querySelector('.income-title').value;
            let incomeCash = item.querySelector('.income-amount').value;
            if(incomeItem !== '' && incomeCash !== ''){
                this.income[incomeItem] = +incomeCash;
            }
        });
        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(',');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input',  () => {
            incomePeriodValue.value = this.calcPeriod();
        });
    },
    getAddIncome: function(){
      additionalIncomeItem.forEach( (item) => {
        let itemVal = item.value.trim();
        if(itemVal !== ''){
            this.addIncome.push(itemVal);
        }
      });
    },
    getBudget: function () {
        this.budgetMonth =  +this.budjet + this.incomeMonth - +this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth/30);
    },
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value/this.budgetMonth);
    },
    getExpensesMonth: function () {
        return this.expensesMonth;
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
        if(this.deposit){
            this.percentDeposit = getNumberFromUser("Какой процент депозита?", 10);
            this.moneyDeposit = getNumberFromUser("Какой размер депозита?", 100000);
        }
    },
    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;
    }
};

//делаем фотографию объекта
Object.assign(appDataClone, appData);


//Блокируем кнопку "Рассчитать" изначально
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

//событие клика по кнопке сброса
cancel.addEventListener('click', appData.reset);

//клики по плюсикам
expensesPlusBtn.addEventListener('click', appData.addExpensesBlock);
incomePlusBtn.addEventListener('click', appData.addIncomeBlock);

//меняем число под range
periodSelect.addEventListener('input', function () {
    periodAmount.innerHTML = periodSelect.value;
});


// ---------------------------------------------- functions  --------------------------------------
/**
 * Валидация текстового инпута, не даёт вводить пользователю англоийские символы
 * @param selector - селектор
 */
function validTextInput(selector){
    selector.addEventListener('input', () => {
        selector.value = selector.value.replace(/[A-Za-z<>/*#^&=+|\\`~]+$/g, '');
    });
}

/**
 * Валидация текстового инпута, даёт вводить только цифры
 * @param selector
 */
function validNumberInput(selector){
    selector.addEventListener('input', () => {
        selector.value = selector.value.replace(/[\D]+$/g, '');
    });
}
/**
 * Функция очистки инпутов в переданном элементе
 * @param element
 */
function clearInputs(element){
    element.querySelectorAll('input').forEach(item => {
        item.value = '';
    }) ;
}
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



