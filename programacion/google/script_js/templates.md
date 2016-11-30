https://developers.google.com/apps-script/guides/html/templates
https://developers.google.com/apps-script/reference/html/html-template

El fichero .html lo subimos pulsando a Archivo -> Nuevo -> Archivo HTML


function doGet() {
  return HtmlService
      .createTemplateFromFile('Index')
      .evaluate();
}


Si queremos el codigo html en una variable:
body = HtmlService.createTemplateFromFile('Index').evaluate().getContent();


Contenido en crudo
body = HtmlService.createTemplateFromFile('Index').getRawContent();



# Formato templates
<?= new Date() ?>
