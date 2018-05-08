https://www.postgresql.org/docs/9.6/static/view-pg-settings.html

Para ver la configuración de postgres:
select * from pg_settings;

Para ver por ejemplo la conf solo de autovacuum:
select * from pg_settings where name like 'autovacuum%';


Parámetros que se han modificado respecto a los de por defecto:
select name,category,setting,boot_val from pg_settings where setting <> boot_val;
