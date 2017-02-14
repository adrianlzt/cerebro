https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app#fetch(String,Object)

Hacer peticiones http:

// Make a POST request with a JSON payload.
var data = {
  'name': 'Bob Smith',
  'age': 35,
  'pets': ['fido', 'fluffy']
};
var options = {
  'method' : 'post',
  'contentType': 'application/json',
  // Convert the JavaScript object to a JSON string.
  'payload' : JSON.stringify(data)
};
UrlFetchApp.fetch('https://httpbin.org/post', options);



function sendToInflux(agua,electricidad,gas,fecha) {
  var data = 'consumos agua='+agua+',electricidad='+electricidad+',gas='+gas+' '+fecha;
  var headers = {
    'Authorization': 'Basic xxxxxxxxxxxxxxx='
  }
  
  var options = {
    'method' : 'post',
    'payload' : data,
    'headers': headers
  };
  var res = UrlFetchApp.fetch('https://httpbin.org:8086/post?db=test&precision=s', options);
  Logger.log("Código respuesta: " + res.getResponseCode());
}

