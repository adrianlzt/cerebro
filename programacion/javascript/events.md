https://developer.mozilla.org/en-US/docs/Web/Events


Descripción de como carga una web el DOM y el contenido, dependiendo tambien de su colocación:
http://ablogaboutcode.com/2011/06/14/how-javascript-loading-works-domcontentloaded-and-onload



# EventListener
https://www.w3schools.com/jsref/met_document_addeventlistener.asp

Nos registramos ante todos los eventos click y mostramos el codigo HTML donde hemos pinchado
document.addEventListener("click", function(e){
    console.log("hola: " +e);
    console.dir(e.toElement.outerHTML);
});
