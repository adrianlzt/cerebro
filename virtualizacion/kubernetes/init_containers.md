https://kubernetes.io/docs/concepts/workloads/pods/init-containers/

Containers que se ejecutan antes del container principal que pueden realizar operaciones.
Ejemplo, esperar a que un endpoint esté disponible.
O copiar un configmap/secret montado como un fichero a otro lugar (para que pueda ser modificado)
