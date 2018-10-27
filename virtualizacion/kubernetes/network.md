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




# NodePort / LoadBalancer / Ingress
https://medium.com/google-cloud/kubernetes-nodeport-vs-loadbalancer-vs-ingress-when-should-i-use-what-922f010849e0

Estan son las maneras que nos ofrece Kubernetes para introducir tráfico desde el exterior hacia los PODs.

Service/NodePort, abre en todos los nodos del cluster un puerto (30000–32767 y lo enruta hacia la IP interna del Service
Service/LoadBalancer, le pedimos a la cloud donde estemos que nos cree un LoadBalancer (fuera de kubernetes), que apuntará al NodePort que se creará automáticamente.
Ingress: tener desplegado en el cluster un proxy inverso (por ejemplo nginx), que recogerá las reglas que vayamos pasando al crear objetos "Ingress" (no se mete en como le llega el tráfico al ingress)
Port-to-Service (https://github.com/kubernetes/contrib/tree/master/for-demos/proxy-to-service): exponemos el puerto de un pod directamente en el puerto del nodo. El pod del repo nos reencamina el tráfico al service que le digamos

