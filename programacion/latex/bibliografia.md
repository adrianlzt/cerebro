http://merkel.zoneo.net/Latex/natbib.php

En http://navarroj.com/latex/ezthesis.html tiene uno modificado para usar con español.

El fichero ezspanish.bst es un bibliographic style.
Aqui se define que podemos poner en el fichero biblio.bib y con que parámetros.
Un tipo por ejemplo es "manual" que lo veremos definido como "FUNCTION {manual}".
Al comienzo del fichero también están definidos los parámetros aceptados como: "ENTRY".

Es necesario meter: "bibtex NOMBRE" como parte de la compilación. Ponerlo dos o tres veces.

Para generar la bibliografía se pondrá la orden:
\bibliography{biblio}

Para insertar la referencia en el texto haremos (mirar ezspanish.bst para más opciones, aunque no me cuadran mucho):
~\citep{NewCam97} -> esto solo pondrá [n] indicando el número para que lo veamos en la bilbiografía
Podemos poner:
~\citet{Rofl06} -> para que aparezca el nombre del autor: "Caesar et al. [1]" junto con el número de la bibliografía.

En el fichero biblio.bib habremos definido la bibliografía que queremos usar.


Para citar una web:
Puppet cuenta con la funcionalidad llamada exported resources~\citep{exported_resources}
No dejar espacio en blanco para separar.

@misc{exported_resources,
        Title = {Puppet - Exported resources},
        Url = {https://docs.puppetlabs.com/guides/exported_resources.html}
} 



Más ejemplos de bibliografía:

@article{NewCam97,
        Author = {Isaac Newton and Naomi Campbell},
        Journal = {Jornal of Funny Physics},
        Pages = {39--78},
        Title = {A Re-formulation of Gravity with Respect to Really Cool Models},
        Volume = {35},
        Year = {1997}}

@book{Knuth84,
        Author = {Donald E. Knuth},
        Publisher = {Addison-Wesley},
        Title = {The {\TeX}book},
        Year = 1984}

@inproceedings{Rofl06,
        Author = {Matthew Caesar and Tyson Condie and Jayanthkumar Kannan
                  and Karthik Lakshminarayanan and Ion Stoica},
        Booktitle = {ACM SIGCOMM},
        Title = {{ROFL}: Routing on Flat Labels},
        Year = {2006}}

@manual{doc:natbib,
        Author = {Patrick W. Daly},
        Month = feb,
        Title = {Naural Sciences Citations and References},
        Year = {2007}}
