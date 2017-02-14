# Request
https://github.com/request/request

npm install request

request = require('request')


# Peticion que devuelve json y login
request.get(`${ENDPOINT}/api/?_search=false${status_query}&sord=desc`, {'autr: USER, pass: PASS}}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    let data = JSON.parse(body);
    console.dir(data);
  }
})


# POST con json
request.post("http://httpbin.org/post", {json: {color: "red"}}, function (error, response, body) {
  console.log(body);
});

# Proxy
request.post("http://httpbin.org/post", {proxy: "http://example.com"}, function (error, response, body) { console.log(body); });




# A pelo
https://davidwalsh.name/nodejs-http-request

var http = require('http');

function getTestPersonaLoginCredentials(callback) {

    return http.get({
        host: 'personatestuser.org',
        path: '/email'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback({
                email: parsed.email,
                password: parsed.pass
            });
        });
    });

},
