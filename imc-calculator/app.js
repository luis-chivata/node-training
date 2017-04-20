#!/usr/bin/env node
var moment = require('moment');
var program = require('commander');
var chalk = require('chalk');

var date = moment().format('LLLL');
var imc = 0;

program
    .version('1.0.0')
    .option('-w, --weight [weightAmount]', 'Set the weight in kilograms')
    .option('-h --height [heightAmount]', 'Set the weight in centimeters')
    .parse(process.argv);

console.log('Su nombre de usuario es %s', chalk.yellow(process.env.USER));
console.log('Hoy es %s', chalk.yellow(date));
if (program.weight && program.height) {
    program.height = program.height / 100;
    imc = program.weight / Math.pow(program.height,2);
    if (imc === Infinity) {
        console.log(chalk.red.underline("Su masa es infinita, por favor revise que los dos valores son mayores de 0"));
    } else {
        if (imc < 16) {
            console.log(chalk.red('Infrapeso: Delgadez Severa'));
        } else if (imc < 16.99) {
            console.log(chalk.red('Infrapeso: Delgadez Moderada'));
        } else if (imc < 18.49) {
            console.log(chalk.orange('Infrapeso: Delgadez Aceptable'));
        } else if (imc < 24.99) {
            console.log(chalk.green('Peso Normal'));
        } else if (imc < 29.99) {
            console.log(chalk.yellow('Sobrepeso'));
        } else if (imc < 34.99) {
            console.log(chalk.red('Obeso: Tipo I'));
        } else if (imc < 39.99) {
            console.log(chalk.red('Obeso: Tipo II'));
        } else {
            console.log(chalk.red('Obeso: Tipo III'));
        }
    }
} else {
    console.log(chalk.red('Por favor, agregue su peso en kilogramos y su estatura en centimetros usando los parametros -w y -h'));
}