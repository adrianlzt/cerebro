http://docs.ansible.com/mongodb_user_module.html

# Create 'burgers' database user with name 'bob' and password '12345'.
- mongodb_user: database=burgers name=bob password=12345 state=present

# Ad-hoc
ansible -s group_A_master_ci_3 -m mongodb_user -a "name=juan password=juan database=cyclops state=present replica_set=cyclops"
