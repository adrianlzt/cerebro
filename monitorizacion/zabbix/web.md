# Config
ejemplo de configuración
/usr/share/zabbix/conf/zabbix.conf.php.example



# EveryZ
Modificaciones de la interfaz web para poder cambiar el logo, cosas del menú búsqueda global, etc
http://www.everyz.org/en/
https://github.com/SpawW/everyz


# Global search
Para hacer búsquedas de objetos sobre todo zabbix


# Read only database
Podemos aplicar unos parches, hackish, para que el frontal ataque a una db read only, pero aún así, hace falta que escriba en ciertas tablas: sessions, profiles y user_history.

https://support.zabbix.com/browse/ZBXNEXT-1603
https://github.com/zabbix/zabbix-patches/blob/master/zabbix-3.0/ZBXNEXT-1603/ZBXNEXT-1603.patch

Opciones:
  - meter pgpool para enviar las queries SELECT (solo de lectura) hacia el slave: http://www.pgpool.net/docs/latest/en/html/runtime-config-load-balancing.html
  - parchear más el web para evitar que tenga que escribir en esas tablas
