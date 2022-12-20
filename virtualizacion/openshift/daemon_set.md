https://docs.openshift.com/container-platform/3.5/dev_guide/daemonsets.html

Desplegar un container en todos los pods que tengan un label determinado.

oc get ds
oc edit ds -o yaml

Si modificamos el definición del daemon set los pods que estén actualmente corriendo no serán modificados.
Tendremos que borrar los pods antiguos para que se vuelvan a crear con la nueva config.
https://docs.openshift.com/container-platform/3.5/dev_guide/daemonsets.html


Estado de un daemon set:
oc describe ds/nombre


# API

Lista general de daemonsets:
https://openshift.com/apis/extensions/v1beta1/daemonsets

Lista de daemonsets para un namespace determinado:
apis/extensions/v1beta1/namespaces/logging/daemonsets




# Hostname para cada pod de un daemon set
https://github.com/kubernetes/kubernetes/issues/41977
Issue abierta que piden que exista un hostname tipo:
$host.$service.$namespace.cluster.local

De esta manera podriamos atacar a un pod de un daemon set que este en un host específico.


# Pods misscheduled
https://blog.florentdelannoy.com/blog/2020/kube-daemonset-misscheduled/

Al hacer un kubectl get daemonset vemos numberMisscheduled con valor > 0

Es porque algún pod se desplegó en un nodo y a posteriori pusimos taints a ese nodo, que el pod no cumple.
Borrarlo a mano.


# Red
Podemos hacer que los pod de un daemonSet expongan sus puertos directamente sobre la red del host con
hostNetwork: true


# Crear
Template básico

apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: NOMBRE
spec:
  selector:
    matchLabels:
      name: NOMBRE
  template:
    metadata:
      labels:
        name: NOMBRE
    spec:
      containers:
      - name: NOMBRE
        image: gcr.io/google_containers/echoserver:1.4
