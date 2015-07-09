http://docs.mongodb.org/manual/tutorial/modify-documents/
http://www.tutorialspoint.com/mongodb/mongodb_update_document.htm

cyclops:PRIMARY> db.users.find()
{ "_id" : "admin", "password" : "ANTIGUA" }

cyclops:PRIMARY> db.users.update({"_id" : "admin"},{$set:{"password" : "NUEVA"}})

cyclops:PRIMARY> db.users.find()
{ "_id" : "admin", "password" : "NUEVA" }
