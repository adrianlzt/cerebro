# Project
Son los "tenants" de openstack (que en las nuevas versiones también se llaman proyectos)


# Apps
Serían como las Virtual Machines en OpenStack



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

Mas detalles en internals.md

