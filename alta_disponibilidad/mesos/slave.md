Instalar mesos: https://mesosphere.com/downloads/

Quitar mesos-master del arranque

Configurar el slave:

En Ubuntu mesos arranca con el programa /usr/bin/mesos-init-wrapper
Podemos leer la doc que viene al principio para ver que ficheros carga.

Si solo va a funcionar de esclavo podemos modificar: /etc/mesos/zk
Apuntaremos al mesos-master, cambiando localhost por la ip del master.


Luego lo ejecutaremos
start mesos-slave


No consigo que me conecte por el master. Las trazas no muestran ningun error. Pero en el master parece que no llega ninuna peticion.


