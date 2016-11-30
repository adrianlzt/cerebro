https://developers.google.com/apps-script/guides/services/external#working_with_json
https://developers.google.com/apps-script/guides/content#serving_json_from_scripts


var payload = JSON.stringify(data);
var data = JSON.parse(json);


Servidor web que acepta peticiones JSON y las almacena en FusionTables:
https://script.google.com/d/16edEEBi6TMWq6e6X7NICNmaFlxH7KFjbhlUbiYBbHpTbS3iT2wj_2QUb/edit?usp=drive_web

Peticion tipo:
curl -L "https://script.google.com/macros/s/AKfycbyDz8t2Mpgty/exec" -H "Content-Type: application/json" -d '{"ID":23, "Name":"pepito", "dirID": "9xx9"}'




function doPost(e) {
  if (e.postData.type != "application/json") {
    ret = {"ok": false};
    return ContentService.createTextOutput(JSON.stringify(ret)).setMimeType(ContentService.MimeType.JSON);
  }

  resp = JSON.parse(e.postData.contents);
  FusionTables.Query.sql("INSERT INTO "+database+" (ID,Name,dirID) VALUES('"+resp.ID+"', '"+resp.Name+"', '"+resp.dirID+"');");

  ret = {"ok": true};
  return ContentService.createTextOutput(JSON.stringify(ret)).setMimeType(ContentService.MimeType.JSON);
}




Si necesitamos almacenar un JSON de gran tamaño lo mejor es que usemos un fichero de google drive
function saveFile(){
  var transactions = {'ben@gmail.com ': 1238190238, 'dora@gmail.com' : 1238190238, 'ksd@gmail.com' : 1238190238};
  return DriveApp.createFile('Transactions', JSON.stringify(transactions ));
}

function getFile(){
  var file = DriveApp.getFilesByName('Transactions').next();
  return JSON.parse(file.getAs("application/none").getDataAsString());
}
