https://github.com/kubernetes-sigs/kind

mirar distros.md

# Install
GO111MODULE="on" go get sigs.k8s.io/kind@v0.5.1

# Run
kind create cluster

Config en /home/adrian/.kube/kind-config-kind
Podemos meter esa config en nuestro ~/.kube/config

Por defecto, arranca un único container de docker (kind-control-plane) con k8s corriendo dentro.
No tiene dashboard


# Services / Export port
https://github.com/kubernetes-sigs/kind/issues/808

Desde dentro del kind controller si tenemos acceso a las IPs de los Services.
No desde el host.
Podemos arrancar el kind exponiendo determinados puertos en el host.

También podemos atacar a la IP del contenedor de kind, a uno de los puertos "internos" que se crean con los Service-LoadBalancer (ej.: 80:30226/TCP, tendríamos que atacar al 30226)

## Ingress
https://projectcontour.io/kindly-running-contour/

## LoadBalancer
No tiene https://github.com/kubernetes-sigs/kind/issues/702

Workaround usando otra app:
https://gist.github.com/alexellis/c29dd9f1e1326618f723970185195963


# Volumes
Se crea un storageclass "standard" seleccionado por defecto que nos permite crear PVCs y que se cree el PV automáticamente.

El volumen se creará dentro del container de kind-control-plane, en un dir tipo:
/tmp/hostpath_pv/5fe7dadc-5479-42ac-9792-cf139648b9b7/



# Internals

## Containers
Usa containerd, con el namespace k8s.io

Ver containers:
ctr -n k8s.io c ls
