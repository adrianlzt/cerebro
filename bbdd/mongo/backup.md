http://docs.mongodb.org/v2.6/core/backups/

1.- Copiando los ficheros que usa mongo.
2.- Usando mongodump/mongorestore
3.- MongoDB Management Service


# mongodump/mongorestore
http://docs.mongodb.org/v2.6/reference/program/mongodump/#bin.mongodump
http://docs.mongodb.org/v2.6/reference/program/mongorestore/#bin.mongorestore

Not ideal for capturing backups of larger systems
Los index deben ser reechos tras el restore.
Usar un secundario para hacer el backup: When connected to a MongoDB instance, mongodump can adversely affect mongod performance. If your data is larger than system memory, the queries will push the working set out of memory.


/usr/bin/mongodump --quiet -d cyclops -o /tmp/cyclops-backup.bson
/bin/tar zcvf /tmp/cyclops-backup.bson.tgz /tmp/cyclops-backup.bson


mongorestore, si se hace sobre una bd existente, simplemente añade lo que falte, no va a modificar/actualizar elementos que ya encuentre.

/usr/bin/mongorestore --host "cyclops/nodo1,nodo2,nodo3" -d cyclops /tmp/cyclops-backup.bson/cyclops/
  si ponemos -d <nombre> tendremos que especificar el dir .bson/cyclops, de esta manera no se cambiará lo que ya exista (creo)
