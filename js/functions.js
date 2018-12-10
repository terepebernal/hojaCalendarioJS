/*
 *  Muestra por pantalla una hoja de calendario de un mes y año
 *  que se pedirá al usuario por teclado.
 *  El valor del año estará entre 1601 y 3000.
 * 
 */

// Declaración de variables
var month, year;
var S;
var seguir;

S = true;
while (S) {
    // Pedir por teclado el mes
    month = prompt("Mes....(1 -12)");
    // Comprueba que el mes es correcto
    if (month >= 1 & month <= 12) {
        // Pedir por teclado el año
        year = prompt("Año......(1601 - 3000)");
        // Comprueba que el año sea correcto
        if (year < 1601 | year > 3000) {
            alert("Año incorrecto");
        } else {
            drawMonth(year, month); // Dibuja la hoja de calendario
        }

    } else {
        alert("Mes incorrecto");
    }
    // Da la opción de seguir o salir del programa
    seguir = prompt("Pulsar la tecla S para continuar....");
    if (seguir == 's' | seguir == 'S') {
        S = true;
    } else {
        S = false;
    }
}

/* 
 *  Dibuja la hoja de calendario
 *  del mes (month) y año (year) 
 */
function drawMonth(year, month) {
    /**
     * Declara las variables: 
     * nDM: día del mes que toca escribir
     * lDM: último día del mes
     */
    var nDM, lDM, nAux;
    lDM = 0;
    nDM = 0;
    var week;

    drawHeader(year, month); // Dibuja la cabecera de la hoja de calendario
    week = openMonth(year, month); // Dibuja los caracteres anteriores a la primera semana
    nDM = drawFirstWeek(year, month, week); // Dibuja la primera semana del mes
    lDM = lastDayMonth(year, month);
    week = "";
    while ((lDM - (nDM - 1)) >= 7) {
        nDM = drawNextWeek(nDM, week);
    }
    if (lDM != (nDM - 1)) {
        week = drawLastWeek(nDM, year, month);
    }
}



/**
 * Dibuja la cabecera de la hoja de calendario
 * del mes (month) y año (year)
 */
function drawHeader(year, month) {
    /**
     * Declara la variable line, para controlar
     * el número de caracteres que hay que pintar
     * hasta llegar al año
     */
    var line;
    var mes;

    // Primero un salto de línea
    console.log("\n");
    // Se le asigna a line el número de caracteres que tiene el mes correspondiente
    line = monthText(month).length;
    // Escribir el mes en letra
    mes = monthText(month);
    // Se escriben 22 espacios
    while (line <= 22) {
        mes = mes + " ";
        line++;
    }
    // Se escribe el año
    mes = mes + year;
    console.log(mes + "\n")
        // Subrayado doble
    console.log("===========================");
    // Días de la semana
    console.log("LU  MA  MI  JU  VI | SA  DO");
    // Otro subrayado doble
    console.log("===========================");
}

/**
 * Recibe el mes (month) como número
 * y devuelve el mismo mes (mT) como texto
 */

function monthText(month) {
    /**
     * Declara la variable mT, para contener el texto
     * del mes que corresponda y devolverlo
     */
    var mT;
    // Dependiendo del número de mes, se le asigna a mT el texto correspondiente
    switch (month) {
        case '1':
            mT = "ENERO";
            break;
        case '2':
            mT = "FEBRERO";
            break;
        case '3':
            mT = "MARZO";
            break;
        case '4':
            mT = "ABRIL";
            break;
        case '5':
            mT = "MAYO";
            break;
        case '6':
            mT = "JUNIO";
            break;
        case '7':
            mT = "JULIO";
            break;
        case '8':
            mT = "AGOSTO";
            break;
        case '9':
            mT = "SEPTIEMBRE";
            break;
        case '10':
            mT = "OCTUBRE";
            break;
        case '11':
            mT = "NOVIEMBRE";
            break;
        case '12':
            mT = "DICIEMBRE";
            break;
    }
    return mT;

}

/**
 *  Dependiendo del día de la semana en el 
 *  que comience el mes, muestra por pantalla
 *  los caracteres que corresponden
 */
function openMonth(year, month) {
    /**
     *  Declarar dW para guardar el día de la semana
     *  en el que cae el primer día del mes, y la 
     *  variable week donde guardar los caracteres
     *  para empezar la hoja de calendario con 
     *  la primera semana
     */
    var dW;
    var week = "";

    dW = firstDayMonth(year, month); // Primer día del mes

    /**
     * Según el día de la semana que sea
     * se pintan los caracteres correspondientes
     */
    switch (dW) {
        case 2:
            week = " .  ";
            break;
        case 3:
            week = " .   .  ";
            break;
        case 4:
            week = " .   .   .  ";
            break;
        case 5:
            week = " .   .   .   .  ";
            break;
        case 6:
            week = " .   .   .   .   . | ";
            break;
        case 7:
            week = " .   .   .   .   . |  .  ";
            break;
    }
    return week;
}

/**
 * Recibe el año (year) y mes (month) correspondientes y
 * devuelve el día de la semana (dW) en el que cae el primer 
 * día del mes de ese año
 */
function firstDayMonth(year, month) {
    // Declarar variables
    var fDY, dW, i;
    var lY;

    lY = isLeapYear(year); // ¿Es una año bisiesto?
    fDY = firstDayYear(year); // Primer día de la semana del año
    for (i = 1; i <= month; i++) {
        // Si es enero, el primer día será el primer día del año
        if (i == 1) {
            dW = fDY;
        }
        // Si es marzo, el primer día dependerá de si el año es bisiesto o no
        if (i == 3) {
            if (lY) {
                dW++;
            } else {
                dW = dW;
            }
        }
        // Si es un mes precedido de otro de 31 días, se le sumarán 3 días
        if ((i == 2) | (i == 4) | (i == 6) | (i == 8) | (i == 9) | (i == 11)) {
            dW += 3;
        }
        // Si es un mes precedido de otro de 30 días, se le sumarán 2 días
        if ((i == 5) | (i == 7) | (i == 10) | (i == 12)) {
            dW += 2;
        }
        // Si llega a 8, es lunes
        if (dW == 8) {
            dW = 1;
        }
        // Si llega a 9, es martes
        if (dW == 9) {
            dW = 2;
        }
        // Si llega a 10, es miércoles
        if (dW == 10) {
            dW = 3;
        }
    }
    return dW;
}

/** 
 * Recibe el año (year) y devuelve (lY) si es bisiesto o no
 */
function isLeapYear(year) {
    var lY;
    // Si el año es multiplo de 4
    if (year % 4 == 0) {
        lY = true;
        // Si además es múltiplo de 100 y de 400
        if ((year % 100 != 0) | (year % 400 == 0)) {
            lY = true;
        } else {
            lY = false;
        }
    } else {
        lY = false;
    }
    return lY;
}

/**
 * Recibe el año (year) correspondiente y
 * devuelve el día de la semana (dW) en el que 
 * cae el primer día de dicho año
 */
function firstDayYear(year) {
    var dW, i;
    var lY;
    if (year == 1601) {
        //Si es 1601, el primer día del año es lunes
    } else {
        // Si el año es mayor que 1601, buscar el primer día del año

        dW = 1; // Se empieza en lunes
        for (i = 1602; i <= year; i++) {
            // Si el año anterior fue bisiesto al día de la semana
            // habrá que sumarle dos más, y sino uno.
            lY = isLeapYear(i - 1);
            if (lY) {
                dW += 2;
            } else {
                dW++;
            }
            // Si se llega a 8, es lunes
            if (dW == 8) {
                dW = 1;
            }
            // Si se llega a 9, es martes
            if (dW == 9) {
                dW = 2;
            }
        }
    }
    return dW;
}

/**
 * Recibe el año (year) y el mes (month) correspondientes y
 * devuelve el número del día del mes (nDM) en el que comienza
 * la semana siguiente, y además, pinta la primera semana del mes. 
 */
function drawFirstWeek(year, month, week) {
    // Declarar variables necesarias
    var nDM; // Número del día del mes (valor a devolver)
    var nDW; // Número del día de la semana
    var i; // Contador para recorrer la semana

    nDW = firstDayMonth(year, month); // Día de la semana en que cae el primer día del mes
    nDM = 1; // Día 1 del mes
    for (i = nDW; i <= 7; i++) { // Hasta que lleguemos al domingo
        week = week + " " + nDM; // Escribir un espacio + el número del día del mes
        // Sumar 1 al día del mes y al día de la semana
        nDM++;
        nDW++;
        if (nDW == 6) {
            week = week + " |"; // Si es sábado
        } else {
            week = week + " "; // El resto de días
        }
        if (i != 7) {
            week = week + " "; // Otro espacio
        }
    }
    console.log(week);
    return nDM;
}

/**
 * Recibe el año (year) y el mes (month) y
 * devuelve el último día del mes (lDM),
 * es decir, el número de días del mes.
 *  
 */
function lastDayMonth(year, month) {
    /**
     * Declarar variables: lY (guarda si es año bisiesto),
     * MesDias (para guardar)
     */
    var lY;
    var i;
    var MesDias = [];

    lY = isLeapYear(year);
    if (lY) {
        MesDias[1] = 29;
    } else {
        MesDias[1] = 28;
    }
    for (i = 0; i <= 11; i++) {
        j = i + 1;
        if ((j == 4) | (j == 6) | (j == 9) | (j == 11)) {
            MesDias[i] = 30;
        }
        if ((j == 1) | (j == 3) | (j == 5) | (j == 7) | (j == 8) | (j == 10) | (j == 12)) {
            MesDias[i] = 31;
        }
    }
    lDM = MesDias[month - 1];

    return lDM;
}

/**
 * Recibe el número del día del mes (nDM) que toca mostrar por pantalla,
 * y devuelve, de nuevo, el número del día del mes (nDM), en el que 
 * comienza la semana siguiente.
 * Además, pinta las semanas que existen entre la primera y la útlima semana.
 */
function drawNextWeek(nDM, week) {
    // Declarar i para usarlo como contador
    var snDM, i;

    //Escribir la semana
    for (i = 1; i <= 7; i++) {
        if (nDM < 10) {
            week = week + " ";
        }
        week = week + nDM;
        nDM++;
        if ((i < 5) | (i == 6)) {
            week = week + "  ";
        }
        if (i == 5) {
            week = week + " | ";
        }
    }
    console.log(week);
    return nDM;
}

/**
 * Recibe el número del día del mes (nDM) que toca mostrar por pantalla,
 * el año (year) y el (mes). Además, pinta la última semana.
 * 
 */
function drawLastWeek(nDM, year, month) {
    /**
     *  Declarar las variables: i y j para utilizar como contadores,
     *  lDM para guardar el último día del mes, y week para ir 
     *  guardando la semana que hay que mostrar por pantalla.
     */
    var i, j, lDM;
    var week = "";

    lDM = lastDayMonth(year, month); // Último día del mes
    j = (lDM - nDM) + 1; // Número de días que faltan para terminar el mes
    // Escribir semana
    for (i = 1; i <= j; i++) {
        week = week + nDM;
        nDM++; // Sumar 1 al día del mes
        if (i < 5) {
            week = week + "  "; // Si no ha llegado al viernes
        }
        if (i == 5) {
            week = week + " | "; // Si es viernes
        }
    }
    closeMonth(j, week); // Cerrar la hoja de calendario
}

/**
 *  Dependiendo del día de la semana en el 
 *  que termine el mes, muestra por pantalla
 *  los caracteres que corresponden. Recibe
 *  el día de la semanana en el que acaba el mes
 *  y la variable week, para guardar lo que falta para cerrar
 *  la hoja del calendario. Además lo muestra por pantalla
 */
function closeMonth(dW, week) {
    /**
     * Según el día de la semana que sea
     * se pintan los caracteres correspondientes
     */
    switch (dW) {
        case 1:
            week = week + " .   .   .   . |  .   .";
            break;
        case 2:
            week = week + " .   .   . |  .   .";
            break;
        case 3:
            week = week + " .   . |  .   .";
            break;
        case 4:
            week = week + " . |  .   .";
            break;
        case 5:
            week = week + "  .   .";
            break;
        case 6:
            week = week + "   .";
            break;
    }
    console.log(week);
}