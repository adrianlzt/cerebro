# Instalacion

Fallo con postgresql, requiere más memoria de la disponible:
 * Starting PostgreSQL 9.3 database server
 * The PostgreSQL server failed to start. Please check the log output:
2015-01-18 11:51:27 UTC FATAL:  could not map anonymous shared memory: Cannot allocate memory
2015-01-18 11:51:27 UTC HINT:  This error usually means that PostgreSQL's request for a shared memory segment exceeded available memory or swap space. To reduce the request size (currently 147783680 bytes), reduce PostgreSQL's shared memory usage, perhaps by reducing shared_buffers or max_connections.
   ...fail!
invoke-rc.d: initscript postgresql, action "start" failed.
Mirar bbdd/postgresql/errores.md



Problema arrancando nodo para enlisting.
El cloud-init intenta contactar con el server de metadatos
Primero en la ip 169.xxxx
Luego en 192.168.1.1
Used fallback datasource

Es porque está mal la ip del region-controller. Mirar configurar.md



# Web interface

Internal Server Error.
Viendo el log del apache vemos que salta un Tracebak de python, al final "No route to host"
En /var/log/maas/celery-region.log vemos que el error es que no es capaz de conectarse al servidor amqp:
[2015-01-22 18:51:53,260: ERROR/MainProcess] consumer: Cannot connect to amqp://maas_workers@192.168.1.38:5672//maas_workers: [Errno 113] No route to host.
La ip configurada apunta a un sitio extraño
Es la ip que habíamos definido como IP de MAAS. Al cambiar la ip del server no funciona.
Reconfigurar con: dpkg-reconfigure maas-region-controller



# No levanta con WakeOnLan

wakeionlan instalado?
puesta la MAC en mayúsculas?
MAC de la tarjeta de red ethernet?
servicio maas-cluster-celery arrancado?
Con el portatil, probar a entrar en la bios y desactivar/activar el network boot



# En el enlistment
No space on device
Es porque la máquina está montado un overlayfs con su memoria ram, pero tiene toda la ram ocupada. Incrementar la ram.
Lo he visto con VMs de 256MB de ram.


Algunas veces falla al enlistar. Timeout?


