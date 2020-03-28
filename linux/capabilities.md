http://man7.org/linux/man-pages/man7/capabilities.7.html
http://man7.org/linux/man-pages/man8/setcap.8.html
http://man7.org/linux/man-pages/man8/getcap.8.html

Comprobar capabilities:
getcap fichero
getencap fichero (viejo?)

Permitir al binario /usr/sbin/lvm saltarse los chequeos de lectura/escritura/ejecucción
setcap "cap_dac_override+ep" /usr/sbin/lvm

Permitir ejecutar ping a cualquier user
setcap cap_net_raw+p /bin/ping

sintaxis de las capabilities (man cap_from_text):
name[operator-flags][legal-flags]
operator-flags: = + -
  definir a ese estado, añadir, quitar
legal-flags: e i p
  Effective, Inheritable and Permitted

Effective es lo que se usa para comprobar si algo se puede.
Permitted es un filtro que se aplica a effective
Inheritable es que los heredan subprocesos (execve)
No podemos dar solo effective, si Permitted no está defindo.
Permitted por si solo no otorga nada.
Generalmente haremos ep, para permitir y dar el permiso.


Permitir al binario grafana ejecutarse en cualquier puerto
setcap 'cap_net_bind_service=+ep' /usr/sbin/grafana-server

Permitir acceder a /proc/PID/fd y leer los symlinks
sudo setcap "CAP_DAC_READ_SEARCH,CAP_SYS_PTRACE+ep" telegraf
  CAP_DAC_READ_SEARCH: evitamos chequeos de lectura ficheros y r+x de directorios

quitar capabilities
setcap "-r" /usr/sbin/lvm


ver las capabilities que tiene el usuario que estemos ejecutando:
capsh --print

capsh --drop=cap_chown --
siendo root, arrancar una nueva shell sin capability de modificar owner


Permite el programa leer todos los ficheros, aunque el user no tenga permiso
setcap cap_dac_read_search=+ep binario
