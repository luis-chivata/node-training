var chalk = require('chalk');
var fs = require('fs');

var writeStreamOpts = {
    flags: 'w+',
    defaultEncoding: 'utf8',
    fd: null,
    mode: 0o666,
    autoClose: true
};

var file = fs.createWriteStream(process.env.HOME + '/output.txt',writeStreamOpts)

process.stdin.pipe(file);