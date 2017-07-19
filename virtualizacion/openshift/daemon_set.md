Desplegar un container en todos los pods que tengan un label determinado.

oc get ds
oc edit ds -o yaml

Si modificamos el definición del daemon set los pods que estén actualmente corriendo no serán modificados.
Tendremos que borrar los pods antiguos para que se vuelvan a crear con la nueva config.
https://docs.openshift.com/container-platform/3.5/dev_guide/daemonsets.html
