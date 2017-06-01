var 
express = require('express'), 
cors = require('cors'), 
fs = require('fs'),
http = require('http'),
https = require('https'),
privateKey  = fs.readFileSync('localhost.key', 'utf8'),
certificate = fs.readFileSync('localhost.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate, passphrase: 'isbanApi06'};
var app = express();

app.use(cors());
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

var httpPort = 8090;
var httpsPort = 8443;

httpServer.listen(httpPort, function () {
    console.log('OAuth server listening on port '+httpPort);
});


httpsServer.listen(httpsPort, function () {
    console.log('OAuth server listening on port '+httpsPort);
});

app.get('/metadata', function (req, res, next) {
    console.log("GET metadata req::::::::::");
    console.log("--------------");
    console.log("headers::::::::::"+ JSON.stringify(req.headers));

    res.setHeader('API-OAUTH-METADATA-FOR-ACCESSTOKEN', 'tres tres');
    res.setHeader('API-OAUTH-METADATA-FOR-PAYLOAD', 'cuatro cuatro');
    res.statusCode = 200;
    res.end();
});
 
app.post('/metadata', function (req, res, next) {
	console.log("POST metadata req::::::::::");
	console.log("--------------");
	console.log("headers::::::::::"+ JSON.stringify(req.headers));

	res.setHeader('API-OAUTH-METADATA-FOR-ACCESSTOKEN', 'uno uno');
	res.setHeader('API-OAUTH-METADATA-FOR-PAYLOAD', 'dos dos');
	res.statusCode = 200;
	res.end();
});

app.get('/authenticate', function(req, res, next) {
 
    console.log("calling authenticate");
 
    var authorization = req.headers.authorization;
    var tmp = authorization.split(' ');
 
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();
 
    var creds = plain_auth.split(':');
    var username = creds[0];
        console.log('username:::::' + username);
    var password = creds[1];
 
    if (("denay" == username)) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.end();
    } else {
	 	res.setHeader('API-OAUTH-METADATA-FOR-ACCESSTOKEN', '{"sessionId":"lashjasdklfhdshfsa","customerType":"Personal":"repository":"InternetB2B"}');
		res.setHeader('API-OAUTH-METADATA-FOR-PAYLOAD', '{"sessionId":"lashjasdklfhdshfsa","customerType":"Personal":"repository":"InternetB2B"}');
        res.statusCode = 200;
        res.jsonp({"ok":200});
        res.end();
    }
 
});

