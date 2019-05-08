http://git-scm.com/book/en/Git-Tools-Submodules

Cada repo de git apuntará a un commit determinado de cada uno de sus submodulos.
Si se actualiza un submodulo, tendremos que actualizar el git parent y commitear para almacenar ese nuevo commit a donde apuntar.


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


Actualizar los submodulos:
git submodule foreach git pull origin master
