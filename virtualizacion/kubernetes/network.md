https://kubernetes.io/docs/concepts/cluster-administration/networking
https://medium.com/google-cloud/understanding-kubernetes-networking-pods-7117dd28727
https://medium.com/@maniankara/kubernetes-tcp-load-balancer-service-on-premise-non-cloud-f85c9fd8f43c

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
mirar ingress.md y services.md

Estan son las maneras que nos ofrece Kubernetes para introducir tráfico desde el exterior hacia los PODs.

Service/NodePort, abre en todos los nodos del cluster un puerto (30000–32767 por defecto, HostPortRange) y lo enruta hacia la IP interna del Service
Service/LoadBalancer, le pedimos a la cloud donde estemos que nos cree un LoadBalancer (fuera de kubernetes), que apuntará al NodePort que se creará automáticamente.
Ingress: tener desplegado en el cluster un proxy inverso (por ejemplo nginx), que recogerá las reglas que vayamos pasando al crear objetos "Ingress" (no se mete en como le llega el tráfico al ingress)


apiVersion: v1
kind: Service
metadata:
  name: coredns-np
  namespace: kube-system
spec:
  type: NodePort
  ports:
  - name: dns
    port: 53
    protocol: UDP
    targetPort: 53
    nodePort: 30000–32767 # opcional, poner uno que no colisione
  - name: dns-tcp
    port: 53
    protocol: TCP
    targetPort: 53
  selector:
    k8s-app: kube-dns



# Opciones para desarrollo

## Apiserver proxy
https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster/#manually-constructing-apiserver-proxy-urls
Aquí usamos el apiserver como proxy para acceder a un service

http://kubernetes_master_address/api/v1/namespaces/namespace_name/services/service_name[:port_name]/proxy
http://kubernetes_master_address/api/v1/namespaces/namespace_name/services/https:service_name:[port_name]/proxy
  este si el service es https


## port-forward
https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/
Usar la cli para crear un tunel de un puerto de un pod a nuestra máquina

Se puede enrutar un pod, un deployment, rc o service:
kubectl port-forward pods/redis-master-765d459796-258hz 6379:6379
kubectl port-forward deployment/redis-master 6379:6379
kubectl port-forward rs/redis-master 6379:6379
kubectl port-forward svc/redis-master 6379:6379




# Otras opciones no recomendadas
Don’t specify a hostPort for a Pod unless it is absolutely necessary. When you bind a Pod to a hostPort, it limits the number of places the Pod can be scheduled, because each <hostIP, hostPort, protocol> combination must be unique. If you don’t specify the hostIP and protocol explicitly, Kubernetes will use 0.0.0.0 as the default hostIP and TCP as the default protocol.

## nodePort
https://kubernetes.io/docs/concepts/configuration/overview/#services
Tambien tenemos HostPort y HostNetwork para exponer puertos de pods directamente sobre puertos de los nodos.
  Un ejemplo típico es usarlo con un daemonSet
  Port-to-Service (https://github.com/kubernetes/contrib/tree/master/for-demos/proxy-to-service): exponemos el puerto de un pod directamente en el puerto del nodo. El pod del repo nos reencamina el tráfico al service que le digamos

## hostNetwork
Otra opción es exponer el pod directamente en el namespace de red del host. Esto se hace con "hostNetwork: true"
También se suele usar con un daemonSet
Ejemplo: https://gist.github.com/maniankara/e617d6b423394eb00ef0c77a8fdf9cc3#file-tcp-server-ds-yaml
