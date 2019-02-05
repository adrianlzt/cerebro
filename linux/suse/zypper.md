Buscar:
zypper search paquete

Instalar:
zypper install paquete
  si el rpm que intentamos actualizar ha cambiado de Vendor, tendremos que especificar el nombre completo (con versión) para poder actualizarlo.

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
zypper ref -r nombre
