Arrancar con docker

Entrar en la interfaz administrativa: localhost:8083/

Crear una base de datos con el default shard space.

Insertar un punto con la API:
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


Dar a 'Explore data'.
Consultarlo:
select * from hd_used;
