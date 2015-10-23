http://docs.ansible.com/mongodb_user_module.html

# Create 'burgers' database user with name 'bob' and password '12345'.
- mongodb_user: database=burgers name=bob password=12345 state=present

# Ad-hoc
ansible -s group_A_master_ci_3 -m mongodb_user -a "name=juan password=juan database=cyclops state=present replica_set=cyclops"


Si tenemos un replica set y solo queremos ejecutar tareas en el master:
/usr/bin/mongo cyclops --eval "db.isMaster().ismaster && db.users.find({'_id':'admin','password':'21232f297a57a5a743894a0e4a801fc3'}).count()"


# CUIDADO con version a partir de 2.6
el módulo mongodb_user_create
se basa en utilizar pymongo para crear usuarios
lo que termina haciendo es un insert directamente en la colección system.users de la bbdd que le digas
sin embargo en mongo a partir de la 2.6 introdujeron un nuevo modelo de seguridad que cambiar el documento donde se guarda el usuario
introdujeron roles y demás
con ese módulo no podréis crear usuarios a partir de 2.6

