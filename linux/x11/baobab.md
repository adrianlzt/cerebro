http://www.marzocca.net/linux/baobab/

Análisis de ocupación del disco

Podemos ignorar ciertos directorios.

Para quitar los que no se hacen backup.
Obtener listado:
find $HOME -type f -name .nobackup -exec dirname {} \; | sort -u

Abrir dconf-editor
Navegar a org.gnome.baobab.preferences
Meter los directorios con el formato
['file:///path/to/ignore', 'file:///path/to/ignore2']
