Directorio donde se mantienen los ficheros de configuración:
/var/lib/pgsql/data

postgresql.conf <- parámetros de la base de datos
 listen_addresses = 'localhost'         # what IP address(es) to listen on;
                                        # comma-separated list of addresses;
                                        # defaults to 'localhost', '*' = all
                                        # (change requires restart)


pg_hba.conf <- fichero donde se habilita el paso a usuarios, rangos de ip, etc
