var fs = require("fs")
var jwt = require('jwt-simple'); //node install --save jwt-simple

exports.url = function(dashnum) {
  var secret = fs.readFileSync('./secret', 'utf8')
  secret = secret.replace(/^\s+|\s+$/g, '')
  var ORGANIZATION_SECRET = secret;
  var BASE_URL = 'https://embed.chartio.com/d/' + dashnum;

  var now = parseInt(new Date().getTime() / 1000);

  var payload = {
      'iat': now,
      'nbf': now,
      'exp': now + 86400, //one day from now.
      'dashboard': dashnum,
      'organization': 19852,
      'env': {"MYVAR": 42}
  };

  var token = jwt.encode(payload, ORGANIZATION_SECRET, 'HS256');
  var chart_url = (BASE_URL + '/' + token);
  return chart_url
}
