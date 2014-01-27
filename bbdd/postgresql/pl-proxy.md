http://wiki.postgresql.org/wiki/PL/Proxy

PL/Proxy is database partitioning system implemented as PL language. Main idea is that proxy function will be created with same signature as remote function to be called, so only destination info needs to be specified inside proxy function body.

Todas las peticiones a nuestra bd llegan al proxy, este se encarga de enviar cada petición a uno de los nodos del pool según una función.
De esta manera conseguimos escalabilidad de la bd, agregando nodos nuevos a los que balancear los datos.
Por defecto usa un función Módulo 16 para repartir la carga, que nos será suficiente a no ser de que tengamos más de 16 nodos.

Si metemos un nuevo nodo tendremos que encargarnos manualmente de mover los datos de uno nodo a otro para equiparar la carga de almacenamiento entre nodos.
Otra opción es marcar el nodo muy cargado como de solo lectura.
