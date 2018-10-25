https://kubernetes.io/docs/concepts/cluster-administration/networking
https://medium.com/google-cloud/understanding-kubernetes-networking-pods-7117dd28727

Tres tipos de redes:

 - intra pod: comunicación de los containers de un mismo pod entre si usando localhost
 - pod-to-pod: red plana entre todos los pods del cluster
 - pod-to-service: VIP balanceada entre todos los pods seleccionados por un "selector"
 - external-to-service:

La pod network puede ser plana entre todos los nodos? En openshift es así.



# Flannel
Para lograr comunicación pod-to-pod y pod-to-service (y external-to-service?).

## Errores
Esta configurado apuntando a la interfaz que debe?
Desplegando en vagrant estaba cogiendo la interfaz eth0, que es host-only y no funcionaba. Tenía que coger la eth1 que comunicaba las vms
