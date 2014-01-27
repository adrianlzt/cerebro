Se pueden tener dos centrales en activo-activo.
La HA la lleva la app directamente.

Se monta un Load Balancer con Sticky session por encima de los dos Central.

La base de datos se usa para tener los datos compartidos por los dos central.

Si conectamos a un central, realizaremos todas las operaciones en ese central (es como si cada central no conociese la existencia de otro, aunque si saben de la exitencia del otro, pero no me saben decir porque)
