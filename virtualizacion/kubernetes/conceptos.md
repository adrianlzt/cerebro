Mezcla de conceptos de openshift y kubernetes


# Pod (algo parecido a las tasks en docker swarm)
https://kubernetes.io/docs/concepts/workloads/pods/pod/

A pod is a group of one or more containers, the shared storage for those containers, and options about how to run the containers
Kubernetes deploys and schedules containers in groups called pods. A pod will typically include 1 to 5 containers that collaborate to provide a service.

Pueden ser varios containers corriendo como uno solo, pero en la realidad parace que suele ser pod == container

Razón de poder tener varios containers como un solo pod:
The primary reason that Pods can have multiple containers is to support helper applications that assist a primary application. Typical examples of helper applications are data pullers, data pushers, and proxies. Helper and primary applications often need to communicate with each other. Typically this is done through a shared filesystem, as shown in this exercise, or through the loopback network interface, localhost. An example of this pattern is a web server along with a helper program that polls a Git repository for new updates.
The Volume in this exercise provides a way for Containers to communicate during the life of the Pod. If the Pod is deleted and recreated, any data stored in the shared Volume is lost.

Kubernetes ensures that pods are able to network with each other, and allocates each pod an IP address from an internal network. This ensures all containers within the pod behave as if they were on the same host. Giving each pod its own IP address means that pods can be treated like physical hosts or virtual machines in terms of port allocation, networking, naming, service discovery, load balancing, application configuration, and migration.



# Groups
Agrupaciones de services.
Por ejemplo, una app django y un backend postrgresql



# Replication controllers
Replication controllers are the way to instantiate pods in Kubernetes. They control and monitor the number of running pods for a service, improving fault tolerance.



# Project (openshift)
Son los "tenants" de openstack (que en las nuevas versiones también se llaman proyectos)



# Apps
Conjunto de pods que forman mi aplicación



# Services
https://kubernetes.io/docs/concepts/services-networking/service/
https://docs.openshift.org/latest/architecture/core_concepts/pods_and_services.html#services

Configuramos una VIP que apunta a todos los PODs de la app.
Esta VIP puede ser usada por otros PODs para conectar con esta app.
Es un load balancer interno.

Ejemplo, montamos un frontend (app1) y un backend (app2).
Para el app2 configuramos un service (se crea una VIP para app2)
app1 puede atacar a app2 usando la VIP creada.
O usando el dominio: app2.myproject.svc 

Mas detalles en kubernetes/internals.md


# Group services
Si tenemos una aplicación compuesta por dos partes (django+postrgresql, por ejemplo), cada uno de estos será un service distinto (y cada uno con un pod).
Los dos estarán unidos formando un grupo de services.



# Build
https://docs.openshift.org/latest/dev_guide/builds/index.html

A build in OpenShift Origin is the process of transforming input parameters into a resulting object. Most often, builds are used to transform source code into a runnable container image.

Hay tres tipos de build (https://docs.openshift.com/container-platform/3.3/architecture/core_concepts/builds_and_image_streams.html#docker-build):
  - Docker, cuando hay un dockerFile
  - Source-to-image (S2I): framework that makes it easy to write images that take application source code as an input and produce a new image that runs the assembled application as outpu
    https://docs.openshift.com/container-platform/3.3/creating_images/s2i.html#creating-images-s2i
  - Custom build: crear una imagen de docker custom para nuestro proceso de build
  - Pipeline build: definir una pipeline de jenkins (Jenkinsfile)



# ImageStream
https://docs.openshift.org/latest/dev_guide/managing_images.html
https://docs.openshift.org/latest/architecture/core_concepts/builds_and_image_streams.html#image-streams

Vista virtual sobre una serie de imagenes de containers, similar a un repositorio de imágenes de Docker.

Los objetos se pueden suscribir a un "image stream" y recibir notificaciones de nuevas imágenes. Por ejemplo, se puede hacer un build cuando se reciba una notificación de una nueva imagen.
