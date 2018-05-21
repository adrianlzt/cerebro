# Tabla items
Tabla donde se relaciona cada uno de los elementos (itemid) con sus parametros el host, si nombre, delay, history, trends


# history
Tablas donde se almacenan los valores de cada item con un timestamp
Cada tipo de dato se almacena en tablas distintas
history <- este almacena los double
history_log
history_str <- aqui por ejemplo se almacenan cadenas como el uname de las maquinas, version de kernel, etc
history_text
history_uint

Si usamos ElasticSearch, estas tablas se almacenan en ES en vez de la SQL.
