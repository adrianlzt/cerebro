http://docs.mongodb.org/manual/reference/operator/query/

db.COLECION.find(
{ age: { $gt: 18 } },    <- clausula "where"
{ name: 1, address: 1 }   <- los datos que queremos sacar (por defecto saca el _id, lo podemos quitar con _id:0)
).limit(5)

name: 1, quiere decir que saquemos ese campo

Si hiciesemos: "name: 0" (sin el address), sacaríamos todo menos name


SELECT _id, name, address
FROM users
WHERE age > 18
LIMIT 5


> db.assurance.tt.incidence.distinct('responsible.historical.group', {contact_eid: { $gt: 12000}})
Saca los elementos distintos de responsible.historical.group con contact_eid>12000



Contar salidas de un find:
db.users.find({'_id':'admin'}).count()


db.users.find({'_id':/expr regular/})


# Fecha
cyclops:PRIMARY> db.tasks.find({"updated_at": {"$gte": ISODate("2016-04-26T00:00:00.000Z")}})
43434


# And / Or / Not / Nor / Ne
https://docs.mongodb.org/manual/reference/operator/query-logical/
https://docs.mongodb.org/manual/reference/operator/query/ne/

{ $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }

db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )



Ne es !=
db.inventory.find( { qty: { $ne: 20 } } )
