https://docs.openshift.org/latest/admin_guide/router.html


OpenShift usa haproxy como proxy inverso para recibir las requests y pasarlas a las aplicaciones:

This is a component of OpenShift Origin and contains an HAProxy instance that automatically exposes services within the cluster through routes, and offers TLS termination, reencryption, or SNI-passthrough on ports 80 and 443


# Monitoring
Podemos acceder a las métricas de haproxy en IP_INTERNA_HAPROXY:1936
El user es admin, la pass está definida como variable de entorno, para obtenerla:
docker inspect CONTAINERHAPROXY

Tal vez el puerto esté expuesto en el docker host.


# Config
Podemos ver la conf de haproxy ejecutando (desde el docker host donde este el container):
nsenter -t $(pgrep haproxy) -m less /var/lib/haproxy/conf/haproxy.config
  lo que hacemos es coger el pid del proceso haproxy, meternos en su mount namespace y ver el contenido de la conf

nsenter -t $(pgrep haproxy) -m less /var/lib/haproxy/router/routes.json
  este es el fichero desde el que se genera la conf de haproxy
