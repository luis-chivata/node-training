var chalk = require('chalk');

function imc(weight,height) {
    //height = height / 100;
    var imc = weight / Math.pow(height,2);
    if (imc < 16) {
        return chalk.red('Infrapeso: Delgadez Severa');
    } else if (imc < 16.99) {
        return chalk.red('Infrapeso: Delgadez Moderada');
    } else if (imc < 18.49) {
        return chalk.orange('Infrapeso: Delgadez Aceptable');
    } else if (imc < 24.99) {
        return chalk.green('Peso Normal');
    } else if (imc < 29.99) {
        return chalk.yellow('Sobrepeso');
    } else if (imc < 34.99) {
        return chalk.red('Obeso: Tipo I');
    } else if (imc < 39.99) {
        return chalk.red('Obeso: Tipo II');
    } else {
        return chalk.red('Obeso: Tipo III');
    }

}

module.exports = imc;