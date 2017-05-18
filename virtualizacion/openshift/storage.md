https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/storage.html

Se utiliza la solución de Kubernetes: persistent volume (PV) framework.

Cuando se necesita un storage persistente se hace un persistent volume claims (PVCs), que es agnóstico a la tecnología que haya por debajo.


Parece que los PV pueden ser provisionados manualmente con tamaños específicos. Esto podría ser un problema si alguien solicita un PV de un tamaño más grande de los provisionado.


# Plugins soportados
https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/storage.html#types-of-persistent-volumes
