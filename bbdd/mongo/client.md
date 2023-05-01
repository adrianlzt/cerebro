yum install mongodb-org-shell
apt-get install mongodb-clients

En las nuevas versiones (GA en 4.4) el comando es
mongosh

$ mongo 192.169.0.5:9999/foo


# mongo basedatos --eval 'db.collection.find().forEach(printjson)'
--quiet para no sacar infor sobre a donde conectamos, shell version, etc

Mongo Shell:
# mongo
> show dbs
...
betacompany
...
> use betacomany
> show collections		Seria como show tables
...
site
...
> db.site.findOne()		Saca el primer resultado que encuentra. El output es JSON
{
        "_id" : ObjectId("51da4e978413558022750db7"),
        "code" : "1",
        "type" : "region",
        "name" : "Andalucia"
}
> db.site.find({'name': "Madrid"}		Busca los que tengan name a madrid
{ "_id" : ObjectId("51da4e978413558022750de5"), "code" : "28", "type" : "province", "name" : "Madrid", "site" : { "type" : "region", "code" : "3" } }
> db.site.find({'name': "Madrid"}).pretty	Lo muestra en varias lineas, como el findOne()
function () {
    this._prettyShell = true;
    return this;
}
> db.site.find({'site.code': "3"})		Busca en un parametro anidado


Sacar un json por pantalla:
mongo --eval "printjson(rs.status())"


## Replica set
mongo `mongo --host localhost --quiet --eval "db.isMaster()['primary']"`/database

Otra opción:
Conectar al primerio de un replica set:
mongo --nodb
> conn = new Mongo("myReplicaSet/A:27017,B:27017,C:27017")
Saber si estamos en el master:
db.isMaster().ismaster

Ejecutar acción si es el master:
db.isMaster().ismaster && db.users.findOne()


Permitir leer en un secundario
rs.slaveOk()
db.getMongo().setSlaveOk()
This allows the current connection to allow read operations to run on secondary members.
