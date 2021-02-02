let money, income, addExpenses, deposit, mission, period;

money = 100000;
income = 'freelance';
addExpenses = 'Internet, Credits, Utility bills, Mortgage';
deposit = true;
mission = 1000000;
period = 12;
let budgetDay = money/30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

//Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money
money = 0;
while (!money){
    money = parseInt(prompt("Введите Ваш месячный доход"), 10);
}

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

/*
Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные
“Введите обязательную статью расходов?” (например expenses1, expenses2)
“Во сколько это обойдется?” (например amount1, amount2)
в итоге 4 вопроса и 4 разные переменных
*/
let expenses1, expenses2, amount1, amount2;
expenses1 = prompt('Введите обязательную статью расходов');
amount1 = parseInt(prompt('Во сколько это обойдется?'));
expenses2 = prompt('Введите обязательную статью расходов');
amount2 = parseInt(prompt('Во сколько это обойдется?'));

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
    if(amount1 && amount2){
        return amount1 + amount2;
    }
    return 0;
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
