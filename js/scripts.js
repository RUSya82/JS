const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const incomePlusBtn = document.querySelector('.income').querySelector('button');
const expensesPlusBtn = document.querySelector('.expenses').querySelector('button');
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const additionalIncomeItem1 = additionalIncomeItem[0];
const additionalIncomeItem2 = additionalIncomeItem[1];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const incomeItems = document.querySelector('.income-items');
const incomeItemsAll = document.querySelectorAll('.income-items');
let expensesItemsAll = document.querySelectorAll('.expenses-items');
const expensesItems = document.querySelector('.expenses-items');
const expensesTitle = expensesItems.querySelector('.expenses-title');
const expensesAmount = expensesItems.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const data = document.querySelector('.data');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const depositBank = document.querySelector('.deposit-bank');


class AppData {
    constructor() {
        this.income = {};
        this.addIncome = [];
        this.incomeMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.mission = 1000000;
        this.budjet = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }
    start(){
        this.budjet = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAdd();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();
        this.blockInputs();
        start.style.display= 'none';
        cancel.style.display = 'block';
    }
    reset(){
        this.resetInputs();
        this.removeIncomes();
        this.removeExpenses();
        this.unblockInputs();
        periodSelect.value = 1;
        periodAmount.textContent = '1';
        depositCheck.checked = false;
        depositBank.value = '';
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';
        expensesPlusBtn.style.display = 'block';
        incomePlusBtn.style.display = 'block';
        cancel.style.display= 'none';
        start.style.display = 'block';
        start.setAttribute('disabled', 'true');
        //Создаём новый объект класса AppData
        let appDataClone = new AppData();
        //Очищаем наш объект, сливая его с новым
        Object.assign(this, appDataClone);
    }
    blockInputs(){
        const textInputs = data.querySelectorAll('input[type=text]');
        textInputs.forEach(item => {
            item.setAttribute('disabled', 'true');
        });
    }
    unblockInputs(){
        const textInputs = data.querySelectorAll('input[type=text]');
        textInputs.forEach(item => {
            item.removeAttribute('disabled');
        });
    }
    resetInputs(){
        const textInputs = document.querySelectorAll('input[type=text]');
        textInputs.forEach(item => {
            item.value = '';
        });
    }
    removeIncomes(){
        const incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach((item, index) => {
            if(index !== 0){
                item.remove();
            }
        });
    }
    removeExpenses(){
        let expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach((item, index) => {
            if(index !== 0){
                item.remove();
            }
        });
    }

    /**
     * Добавление блока по нажатию кнопки +
     *
     */
    addBlock(){
        const btn = this;       // this - это кнопка, по которой кликнули
        const elem = btn.parentNode.classList[0];       //получаем str expenses или income
        const clonedElement = document.querySelector(`.${elem}-items`);
        const elemClone = clonedElement.cloneNode(true);
        elemClone.querySelectorAll('input').forEach(item => {
            item.value = '';
        }) ;
        clonedElement.parentNode.insertBefore(elemClone, btn);
        validTextInput(elemClone.querySelector(`.${elem}-title`));
        validNumberInput(elemClone.querySelector(`.${elem}-amount`));
        const elemItemsAll = document.querySelectorAll(`.${elem}-items`);
        if(elemItemsAll.length >= 3){
            btn.style.display = 'none';
        }
    }
    changePercent(){
        const valueSelect = this.value;
        if(valueSelect === 'other'){
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }
    }
    getInfoDeposit(){
        if(this.deposit){
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    depositHandler(){
        if(depositCheck.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            this.deposit = false;
            depositBank.value = '';
            depositAmount.value = '';
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    addListeners(){
        //Разблокируем кнопку "Расчитать" при вводе дохода, но если пользователь стёр, то заблокируем обратно
        salaryAmount.addEventListener('input', function (e) {
            if(salaryAmount.value !== ''){
                start.removeAttribute('disabled');
            } else {
                start.setAttribute('disabled', 'true');
            }

        });
        //клик по кнопке "Рассчитать"
        start.addEventListener('click', () => this.start());

        //событие клика по кнопке сброса
        cancel.addEventListener('click', () => this.reset());

        //клики по плюсикам
        // expensesPlusBtn.addEventListener('click', () => appData.addBlock('expenses'));
        // incomePlusBtn.addEventListener('click', () => appData.addBlock('income'));
        expensesPlusBtn.addEventListener('click', this.addBlock);
        incomePlusBtn.addEventListener('click',  this.addBlock);

        //меняем число под range
        periodSelect.addEventListener('input', function () {
            periodAmount.innerHTML = periodSelect.value;
        });
        let textInputs = document.querySelectorAll('input[placeholder="Наименование"]');
        textInputs.forEach(function (item) {
            validTextInput(item);
        });
        let numberInputs = document.querySelectorAll('input[placeholder="Сумма"]');
        numberInputs.forEach(function (item) {
            validNumberInput(item);
        });
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        //Валидация введённого процента
        depositPercent.addEventListener('input', this.validPercent);
    }
    validPercent(){
        let val = +this.value;
        console.log(typeof val);
        if(val > 100 || val < 1){
            alert('Введите значение от 1 до 100');
            this.value = '';
        }
    }
    getAdd(){
        const func = (item, arr) => {
            item = item.trim();
            if(item !== ''){
                arr.push(item);
            }
        };
        const addExpenses = additionalExpensesItem.value.split(',');
        console.log();
        addExpenses.forEach(item => func(item, this.addExpenses));
        additionalIncomeItem.forEach(item => func(item.value, this.addIncome));
    }
    getExpenses(){
        const expensesItemsAll = document.querySelectorAll('.expenses-items');
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
    }
    getIncome(){
        const incomeItemsAll = document.querySelectorAll('.income-items');
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
    }
    showResult(){
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
    }

    getBudget(){
        let monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth =  +this.budjet + this.incomeMonth - +this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth/30);
    }
    getTargetMonth(){
        return Math.ceil(targetAmount.value/this.budgetMonth);
    }

    getExpensesMonth(){
        return this.expensesMonth;
    }
    getStatusIncome(){
        if(this.budgetDay >= 1200){
            return 'У вас высокий уровень дохода';
        } else if((this.budgetDay < 1200) && (this.budgetDay >= 600)) {
            return 'У вас средний уровень дохода';
        } else if((this.budgetDay > 0) && (this.budgetDay < 600)) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    }

    calcPeriod(){
        return this.budgetMonth * periodSelect.value;
    }

    init(){
        //Блокируем кнопку "Рассчитать" изначально
        start.setAttribute('disabled', 'true');
        this.addListeners();
    }
}
let appData = new AppData();
appData.init();



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