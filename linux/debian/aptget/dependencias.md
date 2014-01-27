apt-cache rdepends paquete
Nos muestra las dependencias inversas, de paquetes instalados o no.

apt-cache depends paquete
Dependencias de un paquete

Ambas: apt-cache showpkg paquete

Mejor instalar apt-rdepends
apt-rdepends paquete -> muestra las dependendias del paquete recursivamente (todas las dependencias)

apt-rdepends --reverse paquete -> muestra todas las dependencias inversas

