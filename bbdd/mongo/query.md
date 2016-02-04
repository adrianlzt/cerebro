http://docs.mongodb.org/manual/reference/operator/query/

db.COLECION.find(
{ age: { $gt: 18 } },    <- clausula "where"
{ name: 1, address: 1 }   <- los datos que queremos sacar
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
