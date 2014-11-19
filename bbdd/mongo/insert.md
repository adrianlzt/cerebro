http://docs.mongodb.org/manual/reference/method/db.collection.insert/

> db.test.insert({user:"adrian",password:"pepe"})
WriteResult({ "nInserted" : 1 })
> db.test.findOne()
{
        "_id" : ObjectId("545a51e27c0ec41c33f51677"),
        "user" : "adrian",
        "password" : "pepe"
}
> 

# mongo basedatos --eval 'db.users.insert({_id:"adrian",password:"adrian"})'
