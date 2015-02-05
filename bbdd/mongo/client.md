yum install mongodb-org-shell
apt-get install mongodb-clients

$ mongo 192.169.0.5:9999/foo


# mongo basedatos --eval 'db.collection.find().forEach(printjson)'

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



## Replica set
Conectar al primerio de un replica set:
mongo --nodb
> conn = new Mongo("myReplicaSet/A:27017,B:27017,C:27017")

Otra opción:
mongo --host `mongo --host unserver --quiet --eval "db.isMaster()['primary']"`


Permitir leer en un secundario
rs.slaveOk()
db.getMongo().setSlaveOk()
This allows the current connection to allow read operations to run on secondary members.
