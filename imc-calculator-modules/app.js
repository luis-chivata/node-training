var moment = require('moment');
var program = require('commander');
var chalk = require('chalk');
var validator = require('./utils/validate');
var imc = require('./utils/imc');

program
    .version('1.0.0')
    .option('-w, --weight [weightAmount]', 'Set the weight in kilograms')
    .option('-h --height [heightAmount]', 'Set the height in centimeters')
    .parse(process.argv);

var date = moment().format('LLLL');
console.log('Su nombre de usuario es %s', chalk.yellow(process.env.USER));
console.log('Hoy es %s', chalk.yellow(date));

if (validator.isPositiveNumber(program.weight, false) && validator.isPositiveNumber(program.height, false)) {
    console.log(imc(program.weight,program.height));
} else {
    console.log(chalk.red('Por favor, agregue su peso en kilogramos y su estatura en centimetros usando los parametros -w y -h'));
}