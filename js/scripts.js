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


/**
 * Объект родитель, шаблон для AppData, содержит в себе функции, не зависящие от свойств потомка,
 * таким образом наши экземпляры appData никак не будут зависеть от внешних функций,
 * но самое главное, если потребуется другой функционал для appData, можно просто созадать другого потомка
 */
class AppDataTemplate {
    /**
     * Валидация текстового инпута, не даёт вводить пользователю англоийские символы
     * @param selector - селектор
     */
    validTextInput(selector) {
        selector.addEventListener('input', () => {
            selector.value = selector.value.replace(/[A-Za-z<>/*#^&=+|\\`~]+$/g, '');
        });
    }

    /**
     * Валидация текстового инпута, даёт вводить только цифры
     * @param selector
     */
    validNumberInput(selector) {
        selector.addEventListener('input', () => {
            selector.value = selector.value.replace(/[\D]+$/g, '');
        });
    }

    /**
     * возвращает куки с указанным name,или undefined, если ничего не найдено
     * источник: https://learn.javascript.ru/cookie
     * @param name
     * @returns {any}
     */
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    /**
     * Устанавливает cookie с указанным name и value, параметры принимаются в виде объекта
     * источник: https://learn.javascript.ru/cookie
     * @param name
     * @param value
     * @param options
     */
    setCookie(name, value, options = {}) {

        options = {
            path: '/',
            'max-age': 86400,
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    deleteCookie(name) {
        this.setCookie(name, "", {
            'max-age': -1
        });
    }

    /**
     *  Возвращает value с ключем key из localStorage
     * @param key
     * @returns {*}
     */
    getFromStorage(key) {
        let value = localStorage.getItem(key);
        if (Array.isArray(value)) {
            value = JSON.parse(value);
        }
        return value;
    }

    /**
     * Записывает key -> value в localStorage
     * @param key
     * @param value
     */
    setToStorage(key, value) {
        if (Array.isArray(value)) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }
}

class AppData extends AppDataTemplate {
    constructor() {
        super();
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

    start() {
        this.budjet = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAdd();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();
        this.blockInputs();
        start.style.display = 'none';
        cancel.style.display = 'block';
        this.setData();

    }

    reset() {
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
        cancel.style.display = 'none';
        start.style.display = 'block';
        start.setAttribute('disabled', 'true');
        //Создаём новый объект класса AppData
        let appDataClone = new AppData();
        //Очищаем наш объект, сливая его с новым
        Object.assign(this, appDataClone);
        this.eraseData();
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(',');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcPeriod();
        });
    }

    /**
     * Запись данных из локального хранилища в поля
     * @param data
     */
    writeData(data) {
        budgetMonthValue.value = (data.budjetMonth) ? data.budjetMonth : '';
        budgetDayValue.value = data.budgetDay ? data.budgetDay : '';
        expensesMonthValue.value = data.expensesMonth ? data.expensesMonth : "";
        additionalExpensesValue.value = data.addExpenses ? data.addExpenses : "";
        additionalIncomeValue.value = data.addIncome ? data.addIncome : "";
        targetMonthValue.value = data.getTargetMonth ? data.getTargetMonth : "";
        incomePeriodValue.value = data.calcPeriod ? data.calcPeriod : "";
    }

    /**
     * Получение данных из локального хранилища
     * @returns {{}} - объект с данными
     */
    getData() {
        let data = {};
        //проверяем, что данные установлены
        if (this.getCookie('isLoad') === 'true') {
            data.isLoad = true;
        } else {
            data.isLoad = false;
        }
        //переменная проверяет, что куки и localStorage соответствуют
        data.isValidCookie = true;
        if (this.getFromStorage('budjetMonth') === this.getCookie('budjetMonth')) {
            data.budjetMonth = this.getFromStorage('budjetMonth');
        } else {
            data.isValidCookie = false;
        }
        //получаем данные и тут же их сверяем
        if (this.getFromStorage('budgetDay') === this.getCookie('budgetDay')) {
            data.budgetDay = this.getFromStorage('budgetDay');
        } else {
            data.isValidCookie = false;
        }
        if (this.getFromStorage('expensesMonth') === this.getCookie('expensesMonth')) {
            data.expensesMonth = this.getFromStorage('expensesMonth');
        } else {
            data.isValidCookie = false;
        }
        if (this.getFromStorage('addExpenses') === this.getCookie('addExpenses')) {
            data.addExpenses = this.getFromStorage('addExpenses');
        } else {
            data.isValidCookie = false;
        }
        if (this.getFromStorage('addIncome') === this.getCookie('addIncome')) {
            data.addIncome = this.getFromStorage('addIncome');
        } else {
            data.isValidCookie = false;
        }
        if (this.getFromStorage('getTargetMonth') === this.getCookie('getTargetMonth')) {
            data.getTargetMonth = this.getFromStorage('getTargetMonth');
        } else {
            data.isValidCookie = false;
        }
        if (this.getFromStorage('calcPeriod') === this.getCookie('calcPeriod')) {
            data.calcPeriod = this.getFromStorage('calcPeriod');
        } else {
            data.isValidCookie = false;
        }
        return data;
    }

    /**
     * Загрузка данных в localStorage и cookie
     */
    setData() {
        this.setCookie('isLoad', 'true');
        this.setToStorage('budjetMonth', budgetMonthValue.value);
        this.setToStorage('budgetDay', budgetDayValue.value);
        this.setToStorage('expensesMonth', expensesMonthValue.value);
        this.setToStorage('addExpenses', additionalExpensesValue.value);
        this.setToStorage('addIncome', additionalIncomeValue.value);
        this.setToStorage('getTargetMonth', targetMonthValue.value);
        this.setToStorage('calcPeriod', incomePeriodValue.value);
        this.setCookie('budjetMonth', budgetMonthValue.value);
        this.setCookie('budgetDay', budgetDayValue.value);
        this.setCookie('expensesMonth', expensesMonthValue.value);
        this.setCookie('addExpenses', additionalExpensesValue.value);
        this.setCookie('addIncome', additionalIncomeValue.value);
        this.setCookie('getTargetMonth', targetMonthValue.value);
        this.setCookie('calcPeriod', incomePeriodValue.value);
    }

    /**
     * Удаление данных из localStorage и cookie
     */
    eraseData() {
        localStorage.removeItem('budjetMonth');
        localStorage.removeItem('budgetDay');
        localStorage.removeItem('expensesMonth');
        localStorage.removeItem('addExpenses');
        localStorage.removeItem('addIncome');
        localStorage.removeItem('getTargetMonth');
        localStorage.removeItem('calcPeriod');
        this.deleteCookie('budjetMonth');
        this.deleteCookie('budgetDay');
        this.deleteCookie('expensesMonth');
        this.deleteCookie('addExpenses');
        this.deleteCookie('addIncome');
        this.deleteCookie('getTargetMonth');
        this.deleteCookie('calcPeriod');
        this.deleteCookie('isLoad');
    }

    blockInputs() {
        const textInputs = data.querySelectorAll('input[type=text]');
        textInputs.forEach(item => {
            item.setAttribute('disabled', 'true');
        });
    }

    unblockInputs() {
        const textInputs = data.querySelectorAll('input[type=text]');
        textInputs.forEach(item => {
            item.removeAttribute('disabled');
        });
    }

    resetInputs() {
        const textInputs = document.querySelectorAll('input[type=text]');
        textInputs.forEach(item => {
            item.value = '';
        });
    }

    removeIncomes() {
        const incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach((item, index) => {
            if (index !== 0) {
                item.remove();
            }
        });
    }

    removeExpenses() {
        let expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach((item, index) => {
            if (index !== 0) {
                item.remove();
            }
        });
    }

    /**
     * Добавление блока по нажатию кнопки +
     *
     */
    addBlock(parentName) {
        const parentElem = document.querySelector('.' + parentName);       //получаем str expenses или income
        const btn = parentElem.querySelector('.btn_plus');
        const clonedElement = document.querySelector(`.${parentName}-items`);
        const elemClone = clonedElement.cloneNode(true);
        elemClone.querySelectorAll('input').forEach(item => {
            item.value = '';
        });
        parentElem.insertBefore(elemClone, btn);
        this.validTextInput(elemClone.querySelector(`.${parentName}-title`));
        this.validNumberInput(elemClone.querySelector(`.${parentName}-amount`));
        const elemItemsAll = document.querySelectorAll(`.${parentName}-items`);
        if (elemItemsAll.length >= 3) {
            btn.style.display = 'none';
        }
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
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

    addListeners() {
        //Разблокируем кнопку "Расчитать" при вводе дохода, но если пользователь стёр, то заблокируем обратно
        salaryAmount.addEventListener('input', function (e) {
            if (salaryAmount.value !== '') {
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
        expensesPlusBtn.addEventListener('click', () => this.addBlock('expenses'));
        incomePlusBtn.addEventListener('click', () => this.addBlock('income'));
        // expensesPlusBtn.addEventListener('click', this.addBlock);
        // incomePlusBtn.addEventListener('click',  this.addBlock);

        //меняем число под range
        periodSelect.addEventListener('input', function () {
            periodAmount.innerHTML = periodSelect.value;
        });
        let textInputs = document.querySelectorAll('input[placeholder="Наименование"]');
        textInputs.forEach((item) => {
            this.validTextInput(item);
        });
        let numberInputs = document.querySelectorAll('input[placeholder="Сумма"]');
        numberInputs.forEach((item) => {
            this.validNumberInput(item);
        });
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        //Валидация введённого процента
        depositPercent.addEventListener('input', this.validPercent);
    }

    validPercent() {
        let val = +this.value;
        if (val > 100 || val < 1) {
            alert('Введите значение от 1 до 100');
            this.value = '';
        }
    }

    getAdd() {
        const func = (item, arr) => {
            item = item.trim();
            if (item !== '') {
                arr.push(item);
            }
        };
        const addExpenses = additionalExpensesItem.value.split(',');
        console.log();
        addExpenses.forEach(item => func(item, this.addExpenses));
        additionalIncomeItem.forEach(item => func(item.value, this.addIncome));
    }

    getExpenses() {
        const expensesItemsAll = document.querySelectorAll('.expenses-items');
        expensesItemsAll.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getIncome() {
        const incomeItemsAll = document.querySelectorAll('.income-items');
        incomeItemsAll.forEach((item) => {
            let incomeItem = item.querySelector('.income-title').value;
            let incomeCash = item.querySelector('.income-amount').value;
            if (incomeItem !== '' && incomeCash !== '') {
                this.income[incomeItem] = +incomeCash;
            }
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }


    getBudget() {
        let monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = +this.budjet + this.incomeMonth - +this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    getExpensesMonth() {
        return this.expensesMonth;
    }

    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if ((this.budgetDay < 1200) && (this.budgetDay >= 600)) {
            return 'У вас средний уровень дохода';
        } else if ((this.budgetDay > 0) && (this.budgetDay < 600)) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    /**
     * инициализиция объекта с данными
     */
    init() {
        let data = this.getData();
        if (data.isLoad) {
            if(data.isValidCookie){
                this.writeData(data);
                this.blockInputs();
                cancel.style.display = 'block';
                start.style.display = 'none';
            }
            else{
                this.reset();
            }

        } else {
            start.setAttribute('disabled', 'true');
        }

        this.addListeners();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let appData = new AppData();
    appData.init();
});

