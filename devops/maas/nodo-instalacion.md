https://maas.ubuntu.com/docs1.5/installing-ubuntu.html

Ahora supuestamente podríamos elegir entre hacer un "default installer", donde se sigue el proceso normal de instalación y donde podríamos seleccionar que opción queremos en cada paso con un preseed.
O "fast installer", que "copies a pre-built Ubuntu image to the node, with all the packages installed that would be normally found in an Ubuntu installation". Este modo no permite configuración con preseed. Usa el proyecto curtin.

Para customizar un "fast installer" mirar fasthpath.md

Pinchando en el bóton en el nodo podemos elegir entre que método preferimos (Si pone "Use tha default installer" quiere decir que tenemos seleccionado el fasthpath, y que al pinchar vamos a cambiar al default)
Tambien podemos saber si va a usar el fasthpath buscando el tag "use-fastpath-installer".
Con el CLI: maas adrian node read node-3c0daaa0-9f3...


Antes de lanzar el nodo (veremos el botón de "Start" en gris) debemos añadir una clave ssh para poder acceder al nodo.
Lo haremos pulsando en las preferencias de nuestra cuenta.

Ahora podremos arrancar el nodo desde la webui o con el cli:
maas adrian node start node-3c0da...
