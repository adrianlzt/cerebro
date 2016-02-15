https://docs.influxdata.com/influxdb/v0.10/guides/writing_data/
https://docs.influxdata.com/influxdb/v0.10/write_protocols/line/

localhost:8086

create a database
curl -X POST 'http://localhost:8086/db?u=root&p=root' -d '{"name": "site_development"}'


# Procolo INLINE
curl -i -XPOST 'http://localhost:8086/write?db=mydb' --data-binary 'cpu_load_short,host=server01,region=us-west value=0.64 1434055562000000000'

El timestamp debe ser en microsegundos.

Si queremos pasar un timestamp en segundos debemos especificarlo:
curl -i -XPOST 'http://localhost:8086/write?db=tools&precision=s' --data-binary 'prueba value=99.0 1452594857'

Para meter varias métricas separarlas por cambios de linea (no vale con poner \n, al menos no funciona con curl, parece que lo escapa)


[key] [fields] [timestamp]

La key debe escapar espacios en blanco y comas: \   \,

fields: mirar tipos_de_datos.md

Timestamp: opcional (heredará el timestamp del server en el momento actual)
Se pone un unix epoch, que puede tener hasta microsegundos: 1434055562000000000
Si no especificamos la unidad del timestamp, se asume que esta en microsegundos (timestamp normal + 000000000)

Ejemplos:
cpu,host=server01,region=uswest value=1 1434055562000000000
cpu,host=server\ 01,region=uswest value=1,msg="all systems nominal"

Ejemplo para cargar datos random:
while true; do
curl -i -XPOST 'http://localhost:8086/write?db=test' --data-binary "random value=$[ ($RANDOM % 10) +1 ]i"
sleep 5
done




# Protocolo JSON DEPRECATED
Insertar dato
curl -XPOST 'http://localhost:8086/db/site_development/series?u=root&p=root' -H "Content-Type: application/json" -d '
[
  {
    "name" : "hd_used",
    "columns" : ["value", "host", "mount"],
    "points" : [
      [23.2, "serverA", "/mnt"]
    ]
  }
]
'


Insertar datos especificando el timestamp (ms)
curl -XPOST 'http://localhost:8086/db/site_development/series?u=root&p=root' -H "Content-Type: application/json" -d '
[
  {
    "name": "log_lines",
    "columns": ["time", "line"],
    "points": [
      [1400425947368, "here is some useful log info"]
    ]
  }
]
'

Insertar varios datos asegurando un orden absoluto (al tener el mismo timestamp, si no damos el sequence_number, podría ordenarlo de cualquier manera)
curl -XPOST 'http://localhost:8086/db/site_development/series?u=root&p=root' -H "Content-Type: application/json" -d '
[
  {
    "name": "log_lines",
    "columns": ["time", "sequence_number", "line"],
    "points": [
      [1400425947368, 1, "this line is first"],
      [1400425947368, 2, "and this is second"]
    ]
  }
]
'
