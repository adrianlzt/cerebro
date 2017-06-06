http://en.wikipedia.org/wiki/Denormalization

Intentar mejorar la performance de una ddbb añadiendo nuevos datos o agrupando datos.

Una opción es que lo gestione el motor de base de datos, por ejemplo con vistas.
Creamos una vista de los datos que nos interesan (haciendo joins de varias tablas) y la bbdd se encarga de que el acceso a esos datos esté optimizado.

Si lo hacemos "a mano", podemos tener un problema de que los datos sean inconsistentes.
Una tabla tenga un valor y otra tabla denormalizada no tenga ese dato actualizado.
Esto generalemnte se hace poniendo constraints.

Conseguiremos más velocidad en las lecturas a costa de mayor costo en las escrituras.
