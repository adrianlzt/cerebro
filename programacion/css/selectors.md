https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
http://www.w3schools.com/cssref/css_selectors.asp
https://code.tutsplus.com/es/tutorials/the-30-css-selectors-you-must-memorize--net-16048

# Selectors básicos
type
  ejemplo "a"

.class
  ejemplo ".miclase"

#id
  ejemplo "#myid"


## Como combinarlos
A, B
  and de ambos selectores

A B
  selector B dentro de selector A

A > B
  selector b hijo de selector A (direc children, como ul > li)

## Orden
El último definido tiene mayor prioridad


## Selectors atributos
Elegir un elemento segun contenga una string en el enlace
a[href*="tuts"] {
color: #1f6053; /* nettuts green */
}

Parecido pero que comienze por:
a[href^="http"] {}

O termine por:
a[href$=".jpg"] {}



Elegir de una lista separada por espacios
a[data-info~="external"] { }
"<a href="path/to/image.jpg" data-info="external image"> Click Me, Fool </a>


Seleccionar un hijo:
X:nth-child(n)
X:nth-last-child(n)
X:nth-of-type(n)
X:nth-last-of-type(n)
X:first-child
X:last-childo

Ejemplo:
.pipelines tbody tr:first-child td:nth-of-type(2), td:nth-of-type(3) {
  visibility: hidden;
}
De un objecto con clase "pipelines", bajamos a su tbody, cogemos el primer tr, y elegimos el segundo y el tercer td.



Parece que por ahora no hay soporte para seleccionar parents:
https://stackoverflow.com/questions/1014861/is-there-a-css-parent-selector
http://caniuse.com/#feat=css-has


Introducir algo antes o despues
https://www.w3schools.com/cssref/tryit.asp?filename=trycss_sel_before
p::before {
    content: "Read this -";
}

