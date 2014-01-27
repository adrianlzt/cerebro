Ejemplo de flujo:

Coger código de git
Crear paquetes
Subirlo a entorno de QA
Hacer pruebas
Pasarlo a producción.

Todos estos flujos pueden tener ramificaciones.
En caso de que las pruebas no vayan bien, podemos, por ejemplo, avisar con un reporte.

HP OO es para convertir guia burros en flujos.


Los flujos pueden ser concurrentes. Para evitar problemas podemos meter locks, para que no pueda haber dos flujos en la misma parte del flujo.

Por debajo son XML. Se pueden usar con control de version. Por defecto Subversion. Con GIT no se sabe seguro.


Los flujos se asignan a grupos, para que se sepa que RAS debe efectuarlo.

Un flujo se puede convertir en un subflujo, y que sea como un paso.
