https://kubernetes.io/docs/reference/kubectl/cheatsheet/
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

Cambiar de contexto:
kubectl config use-context FOO

Namespace actual:
kubectl config view -o jsonpath="{.contexts[?(@.name == '$(kubectl config current-context)')].context.namespace}"


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


kubectl get all
nos devuelve muchos de los recursos, pero no todos, que tengamos configurados en nuestro NS

Devolver ciertos recursos
kubectl get po,deploy


# Servicios
Listar
kubectl get svc


# Pods
Listar
kubectl get pod -o wide
  con -o wide veremos la IP del pod y en que nodo está desplegado

Crear
kubectl run hello-minikube --image=gcr.io/google_containers/echoserver:1.4 --port=8080
  crea un deployment, que crea un replication controller que arranca el pod.
  Como hemos puesto "--port" también levanta un Service/ClusterIP apuntando al selector con el que se crean los pods
  en docker esto arranca:
    - con container denombre k8s_POD_hello-minikube-xxx
    - el container que ejecuta el servicio, nombre k8s_hello-minikube_hello-minikube-xxx

Exponer
kubectl expose deployment hello-minikube --type=NodePort



# Debug
kubectl -v 6 ...



# JSON
https://kubernetes.io/docs/reference/kubectl/jsonpath/
kubectl get XX -o json
kubectl get pods -o=jsonpath='{.items[0]}'

Me parece más sencillo usar "-o json" y luego jq
