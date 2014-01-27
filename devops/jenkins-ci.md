Herramienta de continous integration
La idea del 'continous integration' es la de que multiples desarrolladores están editando el mismo código. Con jenkins comprobamos que todo sigue compilando y pasa los tests.
La idea es que los desarrolladores comiteen los cambios cada día o dos, entonces se testee todo automaticamente.
La idea de enviar cambios cada día es encontrar facilmente los posibles problemas (porque se ha cambiado poco código) (fallos descubiertos cerca del punto donde se desarrollaron).
Podemos desplegar más frecuentemente, obteniendo más feedback.

Fases: compilar, testear, avisar de los problemas
Ejemplo:
  -chequear cada minuto cambios en el repo (google code por ejemplo)
  -si los hay, bajarse el nuevo código
  -construir el programa
  -ejecutar tests, buscar bugs, etc
  -enviar emails con los problemas encontrados

https://wiki.jenkins-ci.org/display/JENKINS/Meet+Jenkins

Hudson lo empezó a desarrollar Sun, cuando lo compró Oracle, se hizo el fork jenkins.
Está escrito en java
