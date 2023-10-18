https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING
file:///usr/share/doc/postgresql/html/libpq-connect.html

Formato tipo URI para definir la, o las, base de datos a donde conectar

postgresql://host1:123,host2:456/somedb?target_session_attrs=any&application_name=myapp

También vale este formato:
host=172.28.0.2,172.28.0.3 user=postgres password=postgres dbname=postgres target_session_attrs=read-only
