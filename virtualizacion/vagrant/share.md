http://www.vagrantup.com/blog/feature-preview-vagrant-1-5-share.html

Compartir la máquina vagrant con otros usuarios.

Necesario tener cuenta en vagrant cloud (mirar cloud.md)


Búsqueda automática de un puerto típico http (80, 3000, 4567, 8000, 8080). Hace GETs para ver si están accesibles y son HTTP
vagrant share

Para fijar un puerto
vagrant share --http 8081

Para compartir ssh
vagrant share --ssh 
