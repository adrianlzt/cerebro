http://man7.org/linux/man-pages/man7/capabilities.7.html
http://man7.org/linux/man-pages/man8/setcap.8.html
http://man7.org/linux/man-pages/man8/getcap.8.html

Comprobar capabilities:
getencap fichero

Permitir al binario /usr/sbin/lvm saltarse los chequeos de lectura/escritura/ejecucción
setcap "cap_dac_override+ep" /usr/sbin/lvm

Permitir ejecutar ping a cualquier user
setcap cap_net_raw+p /bin/ping

Permitir al binario grafana ejecutarse en cualquier puerto
setcap 'cap_net_bind_service=+ep' /usr/sbin/grafana-server

quitar capabilities
setcap "-r" /usr/sbin/lvm


ver las capabilities que tiene el usuario que estemos ejecutando:
capsh --print

capsh --drop=cap_chown --
siendo root, arrancar una nueva shell sin capability de modificar owner


Permite el programa leer todos los ficheros, aunque el user no tenga permiso
setcap cap_dac_read_search=+ep binario
