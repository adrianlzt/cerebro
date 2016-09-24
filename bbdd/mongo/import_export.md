http://docs.mongodb.org/manual/core/import-export/

WARNING
Because these tools primarily operate by interacting with a running mongod instance, they can impact the performance of your running database.


mongodump is a utility for creating a binary export of the contents of a database. Consider using this utility as part an effective backup strategy. Use mongodump in conjunction with mongorestore to restore databases.

mongoexport is a utility that produces a JSON or CSV export of data stored in a MongoDB instance


Exportar BSON:
mongodump
  nos crea en el path actual un dir "dump". Dentro de ese dir otro subdir por cada db.
  Dentro de ese subdir dos ficheros por cada collection (un .bson y un .metadata.json)

mongodump -d database -o dir/
  se puede tambien filtrar con una collection: -c COLECCION
  o con una query: -q QUERY

Importar BSON:
mongorestore -d database fichero.bson
  --drop, borrar cada coleccion antes de importar




Leer ficheros BSON:
https://docs.mongodb.com/manual/reference/program/bsondump/

bsondump fichero.bson
