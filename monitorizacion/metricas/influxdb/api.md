http://influxdb.com/docs/v0.8/api/reading_and_writing_data.html

localhost:8086

create a database
curl -X POST 'http://localhost:8086/db?u=root&p=root' -d '{"name": "site_development"}'

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
