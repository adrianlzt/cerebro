https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/
scheduler por defecto de k8s


Podemos implementar uno custom
https://kubernetes.io/docs/tasks/administer-cluster/configure-multiple-schedulers/


# Stork
https://github.com/libopenstorage/stork

Un scheduler que consulta con los storage drivers donde deben colocarse los pods.

The most basic example is when the scheduler is trying to spawn a container that is part of a pod - Stork will allow for the storage provider to specify an appropriate node on which that container needs to run such that it's data access is local to the runtime of the container. This is one of many orchestration scenarios that is adressed by this project.
