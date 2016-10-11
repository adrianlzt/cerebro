https://developers.google.com/apps-script/reference/gmail/gmail-app

Gestionar el correo desde google script

# Enviar email
GmailApp.sendEmail(to, subject, body);

Si queremos añadir ficheros, bcc, cc, etc:
https://developers.google.com/apps-script/reference/gmail/gmail-app#sendEmail(String,String,String,Object)


# Adjuntos y body de un template (aunque no lo meto como html, es texto plano)
file = DriveApp.getFileById('1qFcwsCJdDfVcIi85mt9');
file2 = DriveApp.getFileById('13SZqBOC7AYs8Tx1loDQ');
body = HtmlService.createTemplateFromFile('Index').getRawContent();

GmailApp.sendEmail('work@gmail.com', 'Reclamación', body, {
   attachments: [file.getAs(MimeType.JPEG), file2.getAs(MimeType.JPEG)]
});
