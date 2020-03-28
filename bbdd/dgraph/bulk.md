https://blog.dgraph.io/post/migrating-from-sql-to-dgraph/

Cargar muchos datos de golpe.

Dos formatos permitidos:
  RDF N-Quad, ejemplo (mirar rdf.md) (en ratel lo meteremos como {set { ...\n... }}:
    _:comments.4 <comments.Id> "4" .
    _:comments.4 <comments.Text> "Of what fabric are the blankets made?" .

  JSON, ejemplo (en ratel los meteremos como {"set":[{...}, {...}]}:
    {
      "uid": "_:comments.4",
      "comments.Id": 4,
      "comments.Text": "Of what fabric are the blankets made?",
    }



# bulk
Para cargas cuando tenemos arrancado zero pero no alpha.
Se soprta formato rdf, rdf.gz, json o json.gz

Aumentar número de ficheros abiertos permitidos
ulimit -n 100000

dgraph bulk -f host-triggers-with-some-dep.json.gz -s schema.rdf

Generará en out/N/p los directorios para los alpha.
Ejemplo, si hemos puesto tener 1 alpha tendremos:
out/0/p

Ese dir será el que tendrá que usar alpha para arrancar



# live
Para cuando ya tenemos la bd arrancada (zero + alpha) y puede que datos en la bd

dgraph live -f prueba.json -s schema.rdf

Ejemplo formato rdf
https://github.com/dgraph-io/dgraph/blob/a1964f61e8d32f854d26f9575484dd4f7bb4c70d/dgraph/cmd/live/load-uids/family.rdf
