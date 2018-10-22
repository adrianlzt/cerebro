https://kubernetes.io/docs/tasks/tools/install-kubectl/
Herramienta administrativa de Kubernetes

# Instalacion
## Google Cloud SDK
Si tenemos instalado Google Cloud SDK
gcloud components install kubectl

## Archlinux
yaourt -Ss aur/kubectl-bin

## Manual
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl


# Config / contexts
kubectl config view

Contexto actual:
kubectl config current-context


## Contextos
Un contexto relaciona un cluster, un usuario y un namespace.

Por defecto tendremos configurado el namespace "default".

Si queremos cambiar el namespace de un context:
kubectl config set-context demo-adrian --namespace kube-system

Lo suyo es tener un contexto por cada namespace que usemos.
Podemos seguir una nomenclatura de contextos tipo:
nombrecluster-(nombreuser?-)nombrenamespace



# Uso

Info cluster (útil para configurar kubectl en un cliente)
kubectl cluster-info

Dump de todo el contenido del cluster:
kubectl cluster-info dump


Nodos del cluster
kubectl get nodes


# Servicios
Listar
kubectl get svc


# Pods
Listar
kubectl get pod

Crear
kubectl run hello-minikube --image=gcr.io/google_containers/echoserver:1.4 --port=8080
  en docker esto arranca:
    - con container POD
    - un container con dnsmasq
    - el container que ejecuta el servicio

Exponer
kubectl expose deployment hello-minikube --type=NodePort
