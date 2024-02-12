# AKS
Kubernetes gestionado de Azure

## Networking
Si queremos exponer las redes de PODs y Services como una virtual net de Azure tenemos que elegir el tipo de red Azure CNI.
https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/app-platform/aks/network-topology-and-connectivity


Si desplegamos un "private cluster", creará en el resource group específico que crea, una private DNS zone donde registrrá el dominio.
Tendrá un virtual link a la red donde se haya desplegado.
