https://postgresqlco.nf/en/doc/param/
  explicación de las diferentes configuraciones, agrupadas por categorías, con valores sugeridos, links a más info, etc
http://pgconfigurator.cybertec.at/
generador online

Directorio donde se mantienen los ficheros de configuración:
CentOS: /var/lib/pgsql/data
Ubuntu: /etc/postgresql/9.3/main

postgresql.conf <- parámetros de la base de datos
 listen_addresses = 'localhost'         # what IP address(es) to listen on;
                                        # comma-separated list of addresses;
                                        # defaults to 'localhost', '*' = all
                                        # (change requires restart)


pg_hba.conf <- fichero donde se habilita el paso a usuarios, rangos de ip, etc



> show all
mostrar los parámetros de configuración que están actualmente funcionando
