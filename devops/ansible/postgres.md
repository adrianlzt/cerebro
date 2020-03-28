1. Add a new group (groups) by postgresql_user module with role_attr_flags=NOLOGIN
2. Grant them desired privileges by postgresql_privs module
3. Add desired PostgreSQL users to the new group (groups) by this module


Probar la query que genera:
ansible localhost -m postgresql_privs -a "db=adrian privs=SELECT roles=adrian objs=foo" -v
