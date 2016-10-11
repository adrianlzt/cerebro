https://developers.google.com/apps-script/guides/html/templates
https://developers.google.com/apps-script/reference/html/html-template

El fichero .html lo subimos pulsando a Archivo -> Nuevo -> Archivo HTML


body = HtmlService.createTemplateFromFile('Index').evaluate().getContent();


Contenido en crudo
body = HtmlService.createTemplateFromFile('Index').getRawContent();
