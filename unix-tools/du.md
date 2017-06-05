du -hsc *

List the 20 largest files or folders under the current working directory.
du -ma | sort -nr | head -n 20 


Solo cosas que ocupen Megas o Gigas
du -hsc * | grep [0-9\.]*[GM]

Ficheros mas pesados, no bajando más de tres niveles:
du -hax -d 3 / | sort -hr | uniq | head -20
