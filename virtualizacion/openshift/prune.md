https://docs.openshift.com/container-platform/3.5/admin_guide/pruning_resources.html

Limpieza de objetos antiguos almacenados en openshift.

NO borra imagenes almacenadas en cada uno de los docker daemons.



# Garbage collection
https://access.redhat.com/solutions/2045633
https://docs.openshift.com/container-platform/latest/admin_guide/garbage_collection.html#image-garbage-collection

/etc/origin/node/node-config.yaml
kubeletArguments:
  minimum-container-ttl-duration:
    - "10s"
  maximum-dead-containers-per-container:
    - "2"
  maximum-dead-containers:
    - "240"
  image-gc-high-threshold:
    - "85"
  image-gc-low-threshold:
    - "80"


Para limpiar imagenes de los docker daemon solo tenemos los parametros image-gc-high-threshold y image-gc-low-threshold, que borran imágenes cuando se supera una ocupación del disco en porcentaje.
Limpia hasta bajar del low threshold.
El problema es que con esta configuración podemos tener miles de imágenes, que van a ralentizar mucho openshift (por ejemplo cuando solicitamos el stats/summary consulta las imagenes disponibles).

El arranque de los garbage collectors se hace en kubelet/kubelet.go StartGarbageCollection y esta puesto a fuego a 5'
