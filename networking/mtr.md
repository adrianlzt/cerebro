Ping + traceroute

Nos muestra la ruta hasta el destino haciendo ping a cada uno de los pasos.
Usa interfaz ncurses.

# Arch
pacman -S mtr
yum install -y mtr


# Uso
mtr www.google.es

Generar un reporte (tras 10 peticiones)
mtr -rnc 10 www.google.es
  -r reporte
  -c numero de peticiones
  -n no resolver dns
