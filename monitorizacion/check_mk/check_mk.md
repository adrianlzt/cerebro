Instalacion del servidor: http://mathias-kettner.com/checkmk_getting_started.html

En los nodos a monitorear hace falta instalar el check_mk-agent
http://mathias-kettner.com/check_mk_download.html
RPM para CentOS/RHEL: http://mathias-kettner.com/download/check_mk-agent-1.2.2p2-1.noarch.rpm
Esta en el repo de EPEL: check-mk-agent.x86_64
Tiene como dependencia a xinetd.

Mas info sobre la instalación del agente en Linux: http://mathias-kettner.com/checkmk_linuxagent.html

Si ejecutamos check_mk_agent nos devolverá una lista con un montón de datos sobre el sistema (df, mounts, ps, memoria, interfaces, etc)
Lo mismo si conectamos al puerto 6556.

Para comprobar que tenemos acceso desde el Icinga/Nagios haremos: check_mk -d 192.168.33.11
Nos devolverá esa lista inmensa de cosas.

En /etc/check_mk/main.mk configuraremos los nodos que queremos chequear con check_mk
all_hosts = [
  "localhost",
  "host1", "host2", "host3",
  "host4", "host5", "host6"
]

Tras meter los hosts en el main.mk realizaremos la autoconfiguración, ejecutando:
cmk -I  (este comando realiza el inventorio de la máquina)
cmk -I host1 host2  (si queremos ir poco a poco)
Este comando ejecutado por segunda vez solo mostrará nuevos elementos. Si no hay nada nuevo, no devolverá nada.

El inventario genera ficheros en /var/lib/check_mk/autochecks
Y a partir de esos se genera la configuración. Puede que tengamos que modificar algo de estos ficheros, por ejemplo si se ha quitado un sistema de ficheros, ya que el inventario no lo quitará (no sabrá si lo hemos quitado, o es un fallo y está desaparecido).

Ahora estamos listos para generar el fichero de configuración para Nagios/Icinga. Previamente, en la instalación de check_mk, ya se habrá instalado un fichero llamado check_mk_templates.cfg
check_mk -O   nos genera la configuración, comprueba que sea válida, y si lo es, reinicia nagios.
Cuidado con que exista ya una definición para localhost.


Lista de los checks que vienen con check_mk: cmk -L


## Migrando de NRPE a MRPE ##
The plugins are called in direct sequence - one after another. No parallelization takes place.

cp /etc/nrpe.d/basic.cfg /etc/check-mk-agent/mrpe.cfg
Lo abrimos con el vim y:
%s/command\[//
%s/\]=/ /

Parece que el fichero mrpe.cfg tiene que ir en /etc/check_mk, no vale el directorio generado por el rpm (/etc/check-mk-agent)

Y ya tenemos el mrpe con el formato especificado.
cmk -O
Y ya tenemos los checks metidos.
