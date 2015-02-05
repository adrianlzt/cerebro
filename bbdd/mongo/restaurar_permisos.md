http://docs.mongodb.org/manual/tutorial/add-user-to-database/
If users exist in the MongoDB database, but none of them has the appropriate prerequisites to create a new user or you do not have access to them, you must restart mongod with the --noauth option.


Borrar la info de autentifacación:
cd /var/lib/mongo
mkdir bak
mv admin.* bak/
service mongod restart


Otra opción, desactivarla, pero parece que no funciona una vez hemos creado algun usuario. Usar la de arriba:
vi /etc/mongod.conf
auth=false
service mongod restart
