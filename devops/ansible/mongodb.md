http://docs.ansible.com/mongodb_user_module.html

# Create 'burgers' database user with name 'bob' and password '12345'.
- mongodb_user: database=burgers name=bob password=12345 state=present

# Ad-hoc
ansible -s group_A_master_ci_3 -m mongodb_user -a "name=juan password=juan database=cyclops state=present replica_set=cyclops"


Si tenemos un replica set y solo queremos ejecutar tareas en el master:
/usr/bin/mongo cyclops --eval "db.isMaster().ismaster && db.users.find({'_id':'admin','password':'21232f297a57a5a743894a0e4a801fc3'}).count()"
