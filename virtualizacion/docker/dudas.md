Como medimos para saber que tenemos que desplegar más contenedores?

Si algo falla, como traceamos que contenedor es el culpable?

Meter opentracing y exponer un puerto extra por app?

Si tenemos una app con FE y BE en /api, como gestionamos, un nginx por delante? 

Meter monitorización en los host o en containers?

Como afecta un contenedor "tostado" al resto de contenedores o al propio docker host

manejar permisos de volúmenes (que pasa cuando compartes un volumen con un container, pero la app el container no corre como root)

controlar acceso al socket de docker (si usas el unix:// está más o menos claro, pero si usas también TCP, como gestionarlo)

volúmenes persistentes (rexray+ceph, infinit)

Como gestionar bbdd sql? Volumenes permanentes? Clustering (alguno que funcione)?

Que pasa si limitamos la memoria de un container y la app consume toda? crash de la app?

Compartir un volumen entre dos containers. Con rexray parece que no me deja montar el volumen en dos nodos distintos
