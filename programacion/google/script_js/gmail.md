<https://developers.google.com/apps-script/reference/gmail/gmail-app>

Gestionar el correo desde google script

Ejemplo de aplicación avanzada usando google apps scripts: <https://github.com/rbbydotdev/someday>

# Render html

Visto en "someday".

```js
function doGet() {
  var output = HtmlService.createHtmlOutputFromFile("dist/index");
  output.addMetaTag("viewport", "width=device-width, initial-scale=1");
  return output;
}
```

# gas-local

<https://github.com/mzagorny/gas-local>

Desarrollo en local. No probado.

# clasp

Para desarrollar localmente y luego pushear.
No se puede ejecutar localmente.

<https://developers.google.com/apps-script/guides/clasp#using_clasp>
AUR/nodejs-google-clasp
gclasp

# Enviar email

GmailApp.sendEmail(to, subject, body);

Si queremos añadir ficheros, bcc, cc, etc:
<https://developers.google.com/apps-script/reference/gmail/gmail-app#sendEmail(String,String,String,Object)>

# Adjuntos y body de un template (aunque no lo meto como html, es texto plano)

file = DriveApp.getFileById('1qFcwsCJdDfVcIi85mt9');
file2 = DriveApp.getFileById('13SZqBOC7AYs8Tx1loDQ');
body = HtmlService.createTemplateFromFile('Index').getRawContent();

GmailApp.sendEmail('<work@gmail.com>', 'Reclamación', body, {
attachments: [file.getAs(MimeType.JPEG), file2.getAs(MimeType.JPEG)]
});
