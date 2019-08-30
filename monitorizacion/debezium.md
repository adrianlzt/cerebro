https://github.com/debezium/debezium

Se engancha a la replicación de un motor de db y envía los cambios a Kafka.

Útil para monitorizar una bbdd


Posibles problemas:
  - bases de datos con mucho tráfico generan mucho tráfico de salida, que si solo queremos algunos datos parece demasiado over-kill
  - hace falta reconfigurar la bbdd para permitir conectarse a debezium?
  - impacto en performance?
