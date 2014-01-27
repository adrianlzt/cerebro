apt-get install mongodb-clients

$ mongo 192.169.0.5:9999/foo

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


