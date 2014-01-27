No se deben hacer checks_tcp al puerto 3306 cuando está por detrás MySQL (con el resto?).
Estos checks establecen la conexión tcp, pero cuando el servidor nos solicita autentificación, el check_tcp cierra la conexión.
Esto MySQL lo toma como un aborted connection.
Generalmente, a los 10 aborted connections se bloquea la ip que los está generando.

Podemos ver el número de aborted connections que se están produciendo (de todos los hosts):
mysql> show global status like '%aborted_conn%';

Y el numero de conexiones abortadas máximas permitidas:
mysql> show variables like '%max%errors';
