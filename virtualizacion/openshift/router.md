https://docs.openshift.org/latest/admin_guide/router.html


OpenShift usa haproxy como proxy inverso para recibir las requests y pasarlas a las aplicaciones:

This is a component of OpenShift Origin and contains an HAProxy instance that automatically exposes services within the cluster through routes, and offers TLS termination, reencryption, or SNI-passthrough on ports 80 and 443

Haproxy ve la cabecera "Host" y reencamina el tráfico al nodo con menos conexiones de los pods disponibles.


# Monitoring
Podemos acceder a las métricas de haproxy en IP_INTERNA_HAPROXY:1936
El user es admin, la pass está definida como variable de entorno, para obtenerla:
docker inspect CONTAINERHAPROXY

Tal vez el puerto esté expuesto en el docker host.




# Config
Podemos ver la conf de haproxy ejecutando:
oc project default
oc rsh router-n-xxxxx
$ less /var/lib/haproxy/conf/haproxy.config
$ less /var/lib/haproxy/router/routes.json
  fichero desde el que se genera la conf de haproxy
$ less /var/lib/haproxy/conf/os_*.map
  hace el mapeo de los hostnames a los backend de haproxy
  un fichero por cada tipo de ruta (edge, http, reencrypt, etc)


O desde dentro de un nodo de infraestructura:
nsenter -t $(pgrep haproxy) -m less /var/lib/haproxy/conf/haproxy.config
  lo que hacemos es coger el pid del proceso haproxy, meternos en su mount namespace y ver el contenido de la conf

nsenter -t $(pgrep haproxy) -m less /var/lib/haproxy/router/routes.json
  este es el fichero desde el que se genera la conf de haproxy

nsenter -t $(pgrep haproxy) -m less /var/lib/haproxy/conf/os_http_be.map
  fichero donde se hace el mapeo de los hostnames a los backend de haproxy
