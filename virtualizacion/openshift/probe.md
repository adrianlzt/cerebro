https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/


# readinessprobe
Especifica si el container ha terminado de levantarse.
Va asociado a un container.
Típicamente será un check http (httpGet) hacia un puerto esperando un código determinado

# livenessprobe
Determina si el container está funcionando correctamente.
Se usará para determinar si hace falta reiniciar el pod
