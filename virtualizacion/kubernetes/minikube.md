https://kubernetes.io/docs/getting-started-guides/minikube/
https://github.com/kubernetes/minikube

Run Kubernetes locally

# Install
Instalar la herramienta minikube:
Arch: yaourt -Ss aur/minikube-bin
Manual: Bajar ultimo binario de https://github.com/kubernetes/minikube/releases


# Start minikube instance
minikube start --vm-driver=virtualbox
minikube start --kubernetes-version v1.7.0
  especificar version de kubernetes

Se meterá la conf en ~/.kube/config

kubectl cluster-info


Para acceder a la interfaz web (https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/):
minikube dashboard


# En la VM arranca
rkt metadata-service (metadata para los PODs, como el servicio de metadata para las máquinas virtuales)
rkt api-service (lists and introspects pods and images)
localkube (parece que es quien expone la API HTTP de kubernetes)

docker con varias imagenes:
 dnsmasq
 sidecar
 kubedns
 kubernetes-dashboard
 kube-addon-manager



Cuando exponemos un pod, el puerto se levanta en el proceso localkube, que parece que redirige las peticiones hacia el container que toque.


# Persistent volumes
https://kubernetes.io/docs/getting-started-guides/minikube/#persistent-volumes

Limitado por usar virtualbox
