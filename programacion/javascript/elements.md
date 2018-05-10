document.getElementById(id).innerHTML = new HTML

Crear
var adri = document.createElement("a");
adri.style["top"] = "10px";
adri.href = "http;//google.com"
<a style="top: 10px;" href="http;//google.com"></a>


Buscar elementos
http://www.w3schools.com/jsref/met_document_queryselectorall.asp

Buscar por contenido:
http://stackoverflow.com/questions/37098405/javascript-queryselector-find-div-by-innertext
document.evaluate('//a[text()="ico"]',document, null, XPathResult.ANY_TYPE, null ).iterateNext()


Selectores por los que podemos buscar:
http://www.w3schools.com/cssref/css_selectors.asp


document.querySelectorAll("a[style='left: 240px; top: 246.75px;']")


Eliminar
var parent = document.getElementById("div1");
var child = document.getElementById("p1");
parent.removeChild(child);
