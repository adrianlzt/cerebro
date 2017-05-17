OpenShift en una VM
https://www.openshift.org/minishift/

Puede usar virtualbox para provisionar

Bajar la última release de https://github.com/minishift/minishift/releases

Baja un binario compilado

Para arrancarlo usando virtualbox
./minishift start --vm-driver virtualbox

Crea ficheros en ~/.minishift
Se baja una iso con el minishift (https://github.com/minishift/minishift-b2d-iso/releases/download/v1.0.2/minishift-b2d.iso boot2docker) y la corre en una VM de virtualbox
Se baja la herramienta oc (despliegue de origin, https://www.openshift.org/download.html#oc-platforms)
  Para meter oc en el path: eval $(minishift oc-env)
Se baja el container openshift/origin

Nos da una ip para acceder a la interfaz web de Origin
Crea en ~/.kube/ la config para acceder al cluster.

Con oc podemos acceder y manejar el cluster.

Con oc podemos gestionar el cluster.
Para loguearnos en el sistema (para poder empezar a usarlo):
oc login -u system:admin



## Parar / status / arrancar / delete
minishift stop
minishift status
minishift start
minishift delete


## Servicios
Dentro de la máquina de openshift tendremos un docker corriendo con las imagenes:
openshift/origin-haproxy-router
openshift/origin-docker-registry
openshift/origin-pod
openshift/origin
  ejecuta openshift-router que a su vez ejecuta haproxy
