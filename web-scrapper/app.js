var request = require('request');
var fs = require('fs');
var http = require('http');
var qs = require('querystring');

var resource = process.argv[2];
var source;

var server = http.createServer(function(req,res){
    var str = req.url.split('?')[1];
    var qobject = qs.parse(str);
    if(qobject['src']!==undefined){
        resource = qobject['src'];
    }
    res.writeHead(200, {"Content-Type": "text/html"});
    if(resource.substr(0,4)==='http') {
        source = request(resource).pipe(res);
    } else {
        source = fs.createReadStream(resource).pipe(res);
    }
    source.on('end', function(){
        res.end();
    });
});

server.listen(9090);

/*var server = http.createServer(function(req,res){
    res.writeHead(200, {"Content-Type": "text/html"});
    var pipe = request.get(resource)
    .on('response', function(response){
        res.write(response.statusCode);
    })
    .pipe(res);
    pipe.on('end',function(){
        res.end();
    });
});

server.listen(9090);*/