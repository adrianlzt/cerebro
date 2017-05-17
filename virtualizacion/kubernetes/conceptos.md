Mezcla de conceptos de openshift y kubernetes


# Pod (algo parecido a las tasks en docker swarm)
https://kubernetes.io/docs/concepts/workloads/pods/pod/

A pod is a group of one or more containers, the shared storage for those containers, and options about how to run the containers
Kubernetes deploys and schedules containers in groups called pods. A pod will typically include 1 to 5 containers that collaborate to provide a service.

Pueden ser varios containers corriendo como uno solo, pero en la realidad parace que suele ser pod == container


# Groups



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
