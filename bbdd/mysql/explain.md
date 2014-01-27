http://dev.mysql.com/doc/refman/5.6/en/explain-output.html#explain_key_len

En 5.6: EXPLAIN UPDATE/DELETE y JSON EXPLAIN

EXPLAIN select ...

Asi podemos obtener si la consulta usa índices etc.
La salida del comando no es trivial entenderla.

En el campo "Extra" si aparece: Using temporary; Using filesort
filesort: eso hace uso de índices en caso de que existan
using filesort y el using temporary son causados por cláusulas de ordenación de datos en el lado de la BBDD


En possible_keys te muestra los posibles índices que puede usar de cara a filtrados, realización de joins, etc,..
key                           | key_len | ref                      | rows
key es el índice que está usando al realizar la consulta
key_len la langitud del campo/índice 
  The key_len specifies the number of bytes that MySQL uses from the key. 
  http://stackoverflow.com/questions/7643491/understanding-mysql-key-len-in-explain-statement
ref es la ruta al campo real usando el alias en lugar del nombre real de la tabla
El es el campo contra el que hace un "match"
por eso ves que en i te viene la referencia a i6
y rows el número de resultados del matcheo


1 | SIMPLE      | i     | ref    | statehist_i_id_o_id_s_ty_s_ti,statehist_state_idx,sla_idx_sthist           | statehist_i_id_o_id_s_ty_s_ti | 9       | icinga.i6.instance_id    | 79974 | Using where                     |

El matcheo de i contra i6 es el que devuelve un total de 79974 columnas que coinciden

