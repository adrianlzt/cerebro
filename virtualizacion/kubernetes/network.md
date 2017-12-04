https://kubernetes.io/docs/concepts/cluster-administration/networking
https://medium.com/google-cloud/understanding-kubernetes-networking-pods-7117dd28727

Tres tipos de redes:

 - intra pod: comunicación de los containers de un mismo pod entre si usando localhost
 - pod-to-pod: red plana entre todos los pods del cluster
 - pod-to-service: VIP balanceada entre todos los pods seleccionados por un "selector"
 - external-to-service: 

La pod network puede ser plana entre todos los nodos? En openshift es así.
