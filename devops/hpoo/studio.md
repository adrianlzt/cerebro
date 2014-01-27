Tiene que usarse en windows.
Solo puede correr una instancia sobre cada SO

Se crean flujos arrastrando desde las barras de la izuierda hacia la derecha.
Se pueden ver las operaciones que realiza dando con el botón derecho y dando a "Open Subflow"

Hay que distinguir entre usar flujos de los content packs (no podemos modificarlos), o copiar un content pack a un directorio nuestro, y ahí modificar el código (o flow) como queramos.


En la barra de abajo tenemos un buscador para entronar operaciones.

Pinchando en cada paso podemos ver la descripción, nombre que le damos en nuestro flow, etc.

Si queremos hacer operaciones especiales, podemos instanciar el "Do nothing", cambiarle el nombre, eliminarle las entradas, y en scriptlet programar en javascript lo que queramos realizar.


Hay que también decidir si las operaciones se filtran en el lado servidor (ejemplo, en ssh haciendo pipes grep, awk, etc) o llevarlo a HP OO.
Si filtramos en el server, metemos menos tráfico, pero si falla vamos a tener menos información.

Las transiciones entre los pasos también se pueden programar en javascript

Doble click sobre los pasos para ver internamente lo que hacen. Ahí podríamos ver si es .Net

Desde el Studio se pueden ejecutar flujos, pero usará el RAS local del Studio.

Debug
En los flujos podemos saltarnos pasos (Override response), o forzar caminos determinados, etc.
En el central puede haber varios hilos, cosa que ejecutando con el Studio no se puede hacer.
