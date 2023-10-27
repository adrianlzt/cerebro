https://www.zabbix.com/documentation/4.2/manual/installation/upgrade/packages/rhel_centos

Generalmente no hay que hacer nada especial.
Parar la versión vieja, actualizar y arrancar.

Se recomienda backup de la bbdd y los ficheros de config, por si fuese necesario rollback.

Mirar los cambios en las templates oficiales.
Tendremos que subirlos a mano. Podemos bajar el XML de la web de share.zabbix.com
Las últimas templates están en https://github.com/zabbix/zabbix/tree/trunk/templates

Mirar las diferencias de configuración de los ficheros de zabbix.conf, de los agents y de los proxies.


# Patch / migraciones db
Las migraciones que se realizan cuando subimos de versión están en
src/libs/zbxdbupgrade/

Podemos comprobar la versión actual que tenemos y el último parche con:
select * from dbversion;

Por ejemplo, si subimos de la version 4.0.27 (último parche 4000006) a la 6.0.10, entiendo que se aplicarán todos los parches superiores a ese 4000006.
