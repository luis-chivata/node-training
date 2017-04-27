var inquirer = require('inquirer');
var chalk = require('chalk');
var moment = require('moment');
var fs = require('fs');

var questions = [
    {
        type: 'input',
        name: 'log',
        message: 'Write your log entry: ',
        validate: function(value){
            if(value===''){
                console.log(chalk.red('You must write something on your log entry'));
                return false;
            } else {
                return true;
            }
        }
    }
];

var writeStreamOpts = {
    flags: 'a',
    defaultEncoding: 'utf8',
    fd: null,
    mode: 0o666,
    autoClose: true
};

inquirer.prompt(questions).then(function(answers){
    var date = moment().format('LL');
    fs.appendFile(process.env.HOME + '/log.dat', date + '\n' + answers.log + '\n', (err) => {
        if(err) throw err;
        console.log(chalk.green('Log saved in file'));
    });
});