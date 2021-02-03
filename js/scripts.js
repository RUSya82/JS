let money, income, addExpenses, deposit, mission, period;

money = 0;
income = 'freelance';
addExpenses = 'Internet, Credits, Utility bills, Mortgage';
deposit = true;
mission = 1000000;
period = 12;
let budgetDay = money/30;
let expensesCount = 4; //количество статей расходов, которые мы учитываем
let expenses = [];
let amount = [];


showTypeOf(income);
showTypeOf(deposit);
showTypeOf(money);


// спрашиваем у пользователя месячный доход
// вместо start() у меня функция, которая просто запрашивает число у пользователя
// она также используется в getExpensensies()
money = getNumberFromUser('Введите свой месячный доход', 100000);

//Спросить у пользователя “Перечислите возможные расходы за
// рассчитываемый период через запятую” сохранить в переменную addExpenses (пример: "Квартплата, проездной, кредит")
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

//преобразуем строку в массив
addExpenses = addExpenses.toLowerCase().split(',');

//почистим от пробелов элементы массива
addExpenses = addExpenses.map((item) => {
    return item.trim();
});

//Вывод возможных расходов в виде массива
console.log(addExpenses);

//Спросить у пользователя “Есть ли у вас депозит в банке?”
// и сохранить данные в переменной deposit (булево значение true/false)
deposit = confirm('Есть ли у вас депозит в банке?');

// спрашиваем обязательные статьи расходов и их величину
getExpensensies();

//Расходы за месяц
console.log('Расходы за месяц: ' + getExpensesMonth());

//Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth
let accumulatedMonth = getAccumulatedMonth();

// Срок достижения цели
let message = (getTargetMonth() > 0) ? (`Цель будет достигнута через ${getTargetMonth()} месяцев`) : ('Цель не будет достигнута никогда, ищите другую работу!');
console.log(message);

//budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
budgetDay = Math.floor(accumulatedMonth/30);
console.log(`Бюджет на день: ${budgetDay}`);

/*
    Написать конструкцию условий (расчеты приведены в рублях)
    Если budgetDay больше 1200, то “У вас высокий уровень дохода”
    Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”
    Если budgetDay меньше 600 и больше 0 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”
    Если отрицательное значение то вывести “Что то пошло не так”
    Учесть варианты 0, 600 и 1200 (к какому уровню не важно)
*/
console.log(getStatusIncome(budgetDay));

// ---------------------------------------------- functions  --------------------------------------
/**
 * ВОзвращает статусную текстовую строку в зависимости от бюджета на день
 * @param budjet - бюджет на день
 * @returns {string}
 */
function getStatusIncome(budjet) {
    if(budjet >= 1200){
        return 'У вас высокий уровень дохода';
    } else if((budjet < 1200) && (budgetDay >= 600)) {
        return 'У вас средний уровень дохода';
    } else if((budjet > 0) && (budgetDay < 600)) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
        return 'Что то пошло не так';
    }
}


/**
 * Функция возвращает сумму всех обязательных расходов за месяц
 * @returns {*}
 */
function getExpensesMonth() {
    let amountAll = 0;
    for(let item of amount){
        amountAll += +item;
    }
    return amountAll;
}

/**
 * Возвращает Накопления за месяц (Доходы минус расходы)
 * @returns {number}
 */
function getAccumulatedMonth() {
    return money - getExpensesMonth();
}

/**
 * Подсчитывает за какой период будет достигнута цель(mission), зная результат месячного накопления
 * (accumulatedMonth) и возвращает результат
 * @returns {number}
 */
function getTargetMonth() {
    if(accumulatedMonth > 0){
        return Math.ceil(mission/accumulatedMonth);
    }
        return -1;
}

/**
 * выводит в консоль тип переменной
 * @param variable
 */
function showTypeOf(variable) {
    console.log(typeof variable);
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
 *
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
 * Запрвшивает у пользователя все расходы (наименование и величина)
 * и записывает их в массивы
 */
function getExpensensies() {
    for(let i = 0; i < expensesCount; i++){
        expenses.push(prompt('Введите обязательную статью расходов'));
        amount.push(getNumberFromUser('Во сколько это обойдется?'));
    }
}
