kubectl get nodes


# Pressure
https://kubernetes.io/docs/tasks/administer-cluster/out-of-resource/
Los nodos deben tener buen estado (disco, memoria, cpu) para estar availables.

Si por ejemplo un nodo está con DiskPressure no aceptará desplegar pods.

Se pueden modificar esos thresholds en los argumentos del kubelet
