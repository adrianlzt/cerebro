https://docs.openshift.com/container-platform/3.5/architecture/infrastructure_components/web_console.html#web-console-statefulsets

A StatefulSet controller provides a unique identity to its pods and determines the order of deployments and scaling. StatefulSet is useful for unique network identifiers, persistent storage, graceful deployment and scaling, and graceful deletion and termination.


Por cada replica se le asigna un Persistent Volume.


# Errores
Si hay un pod fallando, no se puede escalar, ni hacia arriba ni hacia abajo:
https://github.com/kubernetes/kubernetes/issues/36333
