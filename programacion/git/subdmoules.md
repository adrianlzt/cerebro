http://git-scm.com/book/en/Git-Tools-Submodules

Meter un submodule
git submodule add <url> <path>

Bajar submodulos de un proyecto:
git submodule init
git submodule update

La configuración está en .gitmodules

Ver que submódulos tenemos:
git submodule status

Desenlazar un submódulo:
git submodule deinit path/to/submodule
Borrar las entradas de .gitmodules
Borrar los directorios relaccionados de .git/modules/...

Meter a la fuerza el nuevo submodulo: git submodule add -f https://github.com/pdxcat/puppet-module-collectd.git puppet/modules/collectd
