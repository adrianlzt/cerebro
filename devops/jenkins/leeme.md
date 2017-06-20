competencia: drone-ci.md go-ci.md


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


Tasks:
Si ponemos una serie de comandos y uno falla se parará la ejecucción ahí.

Copiar, si queremos copiar una damos a crear una nueva y nos dará la opción al final de la pantalla.

Se puede hacer que todos los ficheros que se generen se almacenen en el "Espacio de trabajo" y los podemos obtener direcmtante.
También podemos usar "Acciones para ejecutar después" -> "Guardar ficheros generados"
Esto lo único que hace es darnos un acceso más directo al fichero.


Ejecutar periódicamente
H * * * * ;cada hora
* * * * * ; cada minuto
Mirar la ayuda para el formato.


# Acceder a ultimas ejecuciones sin poner el numero del build
https://wiki.jenkins-ci.org/display/JENKINS/Terminology
lastBuild, lastStableBuild, lastSuccessfulBuild, lastFailedBuild, lastUnstableBuild, lastUnsuccessfulBuild, lastCompletedBuild
