const request = require('request');
const fs = require('fs');
const http = require('http');
const qs = require('querystring');

//Regexp para URL, creada por Diego Perini (http://www.iport.it)
const regUrl = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
const regFile = /^([\w\/]*?)([\w\.]*)\.(txt|log|dat|jpg|jpeg|png|gif|bmp)$/

let resource = process.argv[2];
let source;

const server = http.createServer(function(req,res){
    const str = req.url.split('?')[1];
    const qobject = qs.parse(str);
    if(qobject['src']!==undefined){
        resource = qobject['src'];
    }
    res.writeHead(200, {"Content-Type": "text/html"});
    if(regUrl.test(resource)==true) {
        source = request(resource);
        source.on('error', (err) => {
            res.end(err.message);
        })
        .pipe(res);
    } else if(regFile.test(resource)) {
        source = fs.createReadStream(resource);
        source.on('error', (err) => {
            res.end(err.message);
        })
        .pipe(res);
    } else {
        res.end('Recurso invalido');
    }


    /*source.on('end', () => {
        res.end();
    });*/
});

server.listen(9090);