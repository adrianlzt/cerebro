http://docs.mongodb.org/manual/core/import-export/

WARNING
Because these tools primarily operate by interacting with a running mongod instance, they can impact the performance of your running database.


mongodump is a utility for creating a binary export of the contents of a database. Consider using this utility as part an effective backup strategy. Use mongodump in conjunction with mongorestore to restore databases.

mongoexport is a utility that produces a JSON or CSV export of data stored in a MongoDB instance


Importar BSON:
mongorestore --host 127.0.0.1:49153 fichero.bson
