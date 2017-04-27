'use strict';

var inquirer = require('inquirer');
var validator = require('./utils/validate');
var chalk = require('chalk');
var moment = require('moment');
var imc = require('./utils/imc');
var fs = require('fs');

var questions = [{
    type: 'input',
    name: 'height',
    message: 'Escriba su altura en metros',
    validate: function (value) {
        if (validator.isPositiveNumber(value, false)) {
            return true;
        } else {
            return 'El valor de su altura no es valido, escriba su altura en metros';
        }
    }
}, {
    type: 'input',
    name: 'weight',
    message: 'Escriba su peso en kilogramos',
    validate: function (value) {
        if (validator.isPositiveNumber(value, false)) {
            return true;
        } else {
            return 'El valor de su peso no es valido, escriba su peso en kilogramos';
        }
    }
}];

var actions = [function (w, h, out) {
    var date = moment().format('LLLL');
    console.log('Hoy es %s', chalk.yellow(date));
    out.write('Hoy es ' + date + '\n');
}, function (w, h, out) {
    var value = imc.value(w, h);
    console.log('Su IMC es %s', chalk.yellow(value));
    out.write('Su IMC es ' + value + '\n');
}, function (w, h, out) {
    var description = imc.description(w, h);
    console.log(description);
    out.write(chalk.stripColor(description) + '\n');
}];

inquirer.prompt(questions).then(function (answers) {
    console.log(chalk.green('Calculando...'));
    var writeStreamOpts = {
        flags: 'w+',
        defaultEncoding: 'utf8',
        fd: null,
        mode: 0o666,
        autoClose: true
    };
    var output = fs.createWriteStream(process.env.HOME + '/imc-out.txt', writeStreamOpts);
    var i = 0;
    var loop = setInterval(function () {
        if (i < actions.length) {
            actions[i](answers.weight, answers.height, output);
            i++;
        } else {
            output.end();
            console.log(chalk.green('Archivo actualizado correctamente'));
            clearInterval(loop);
        }
    }, 1000);
});
