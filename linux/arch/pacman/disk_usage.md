Ordenar los paquetes de más pequeño a más grande:
LC_ALL=C pacman -Qi | awk '/^Name/{name=$3} /^Installed Size/{print $4$5, name}' | sort -h
