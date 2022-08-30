https://postgresqlco.nf/en/doc/param/
  explicación de las diferentes configuraciones, agrupadas por categorías, con valores sugeridos, links a más info, etc
  también nos ayuda a tunear la db
http://pgconfigurator.cybertec.at/
generador online

Directorio donde se mantienen los ficheros de configuración (depende del packger):
CentOS: /var/lib/pgsql/data
Ubuntu: /etc/postgresql/9.3/main

postgresql.conf <- parámetros de la base de datos
 listen_addresses = 'localhost'         # what IP address(es) to listen on;
                                        # comma-separated list of addresses;
                                        # defaults to 'localhost', '*' = all
                                        # (change requires restart)


pg_hba.conf <- fichero donde se habilita el paso a usuarios, rangos de ip, etc


Si un parámetro se define varias veces, se tiene en cuenta la última.


> show all
mostrar los parámetros de configuración que están actualmente funcionando


Podemos usar "ALTER SYSTEM SET foo = bar;"
Esto solo cambiar el valor en el fichero de configuración $DATADIR/postgresql.auto.conf (que tiene más prioridad que postgresql.conf)
Hace falta reload/restart

ALTER SYSTEM RESET foo;
  quitar la linea del postgresql.auto.conf

ALTER SYSTEM RESET ALL;
  borra el fichero postgresql.auto.conf


Para saber si hace falta reload, restart o nada (sighup=reload, postmaster=restart, resto creo que nada)
select name,context from pg_settings ;


No existe la posibilidad de hacer append a las configuraciones.
Discutido aquí, pero sin llegar a nada: https://www.postgresql.org/message-id/74af1f60-34af-633e-ee8a-310d40c741a7%402ndquadrant.com


# Syntax
select pg_reload_conf();
Si devuelve 't' es que la syntax es correcta y se pudo hacer reload.
