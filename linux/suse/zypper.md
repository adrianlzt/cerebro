Buscar:
zypper search paquete

Instalar:
zypper install paquete
  si el rpm que intentamos actualizar ha cambiado de Vendor, tendremos que especificar el nombre completo (con versión) para poder actualizarlo.

Instalar a partir de un repo disabled:
zypper --plus-content repoDesactivado install paquetes
  --plus-content tag
     Additionally use disabled repositories denoted by 'tag' for this operation.
     If 'tag' matches a repositories 'alias', 'name' or 'URL', or is a 'keyword' defined in the repositories metadata, the repository will be temporarily enabled for this operation.
     The repository will then be refreshed and used according to the commands rules. You can specify this option multiple times.
  No funciona en algunas versiones: https://bugzilla.suse.com/show_bug.cgi?id=1123681 (parece que solo afecta a la beta 15? visto en container openSUSE Leap 42.1)

Info:
zypper info paquete

Lista de todos los paquetes, y nos marca los que tenemos instalados:
zypper packages

What provides:
zypper wp fichero

Demonios corriendo con ficheros eliminados:
zypper ps

Repositorios (activos y no activos)
zypper repos

Activar repo:
zypper modifyrepo --enable reponame

Actualizar un repo:
zypper refresh -r nombre


Obsoletes, al contrario que yum, zypper si nos deja instalar un paquete que esté "obsolete".
En yum, si un paquete A está marcado como obsolete por otro paquete B, si intentamos instalar A no nos dejará, e instalará B.
Zypper si nos deja sin problemas.


Los repos se definen en:
/etc/zypp/repos.d/
Podemos poner repos tipo suse o tipo rhel, se detectará automáticamene el tipo (se puede forzar con type=xx)


History:
/var/log/zypp/history


# Debug
https://en.opensuse.org/SDB:Zypper_troubleshooting

Sacar mucho debug al fichero especificado
ZYPP_LOGFILE=zypper.log ZYPP_FULLLOG=1 zypper --plus-content monitorizacion -vv in iometrics-agent
