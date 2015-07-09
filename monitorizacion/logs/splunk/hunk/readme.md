Hunk: interfaz entre splunk y bases de datos nosql (mongo, hadoop, etc)

Se usa para analizar logs en no tiempo real.
Acceso mediante ERPs a bases de datos externas (mongo, hadoop, cassandra, etc)

Nuevo índice virtual de donde se consultan estos datos externos. Al consultar el índice en el source veremos el path de hadoop donde están almacenados los datos. (indice virtual = indice almacenado en hadoop)

Limitaciones:
 - no es tiempo real
 - rendimiento menor (10/100 veces menor)


Ejemplo: cluster hadoop donde se meten los datos con flume en el hdfs (hadoop filesystem).
Guardamos los datos en una estructura de directorios donde llevamos el sourcetype/fecha. Ej: /hunk/flume/SOURCETYPE/FECHA
Este path puede tener más variables, luego en hunk le diremos que es cada cosa.

Se aprovechan ciertas funciones map-reduce de hadoop para obtener los datos que quiere splunk

Hunk: facilitar sacar reportes a partir de datos de hadoop. Splunk nos aporta control por roles, gráficas, etc.

En los search heads habría que configurar para poder atacar a hadoop

Recogida de los en los clientes:
  heavy forwarder como punto de entrada, aquí se decide si se envia a hadoop (en realidad lo enviamos a un puerto de syslog donde está flume)


Licencia: se paga por nodos de hadoop conectados.

Posibles problemas: rendimiento de las consultas


RESUMEN: puede estar bastante verde. Pudese seguir siendo caro. Mucha lentitud
