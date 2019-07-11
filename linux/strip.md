http://en.wikipedia.org/wiki/Strip_%28Unix%29

In Unix and Unix-like operating systems, the strip program removes unnecessary information from executable binary programs and object files, thus potentially resulting in better performance and sometimes significantly less disk space usage. This information may consist of debugging and symbol information; however the standard leaves the scope of changes up to the implementer.

Quitar cosas de debug e información innecesaria. Dejar el binario lo más pequeño posible.
Menos tamaño y teóricamente mejor performance.
Complica que alguien intente hacer dissasembly.
Ejemplos de tamaños con el binario zabbix_server 3.2.6
  5,2M    zabbix_server_pgsql.debug_info (gcc -g)
  1,8M    zabbix_server_pgsql.not_stripped (strip -g)
  1,7M    zabbix_server_pgsql.stripped (strip -a)

Más info sobre como usar strip en programacion/debug/gdb.md
