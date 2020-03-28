https://kubernetes.io/docs/concepts/services-networking/service/

Es la abstracción por encima de los PODs para que otros PODs puedan usar a los primeros.
Ejemplo, un backend que es accedido por un frontend.

El service decidirá a que pods ataca según un selector (una label con un valor).

mirar kube-proxy.md



# Tipos

## ClusterIP
Por defecto, crea una VIP alcanzable internamente dentro del cluster
La VIP llevará el tráfico a los POD con cierta label.


## NodePort
https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
Expone un puerto (por defecto rango 30000-32767) en todos los nodos del cluster que redirigirá el tráfico a nuestro Service.
Crea automaticamente un ClusterIP
Parece que no podemos hacer 127.0.0.1:node_port en los nodos del cluster.

Útil si tenemos nuestros propios LBs (una IP externa nuestra la balancearíamos sobre ese puerto de todos los nodos)
Útil para tráfico no HTTP, HTTPS o TLS SNI (donde usaríamos Ingress seguramente)

Cons:
 - solo un puerto por service
 - solo puertos del rango alto
 - si cambia la IP del nodo, tendríamos que modificar el LB por encima (o si estamos apuntando directamente, dejaríamos de acceder)

Ejemplo:
apiVersion: v1
kind: Service
metadata:
  name: my-nodeport-service
spec:
  selector:
    app: my-app
  type: NodePort
  ports:
  - name: http
    port: 80
    targetPort: 80
    nodePort: 30036  # Opcional, entonces la asignará kubernetes de forma random
    protocol: TCP




## LoadBalancer
https://kubernetes.io/docs/concepts/services-networking/service/#type-loadbalancer
Crea un LB sobre la plataforma en la que estemos, por ejemplo en AWS. Es una abstracción sobre la cloud en la que estemos.
Crea automáticamente un NodePort y un ClusterIP
Luego el Service se actualizará con la ip externa que nos haya dado el cloud provider.
Cada nuevo LoadBalancer tendrá su propia IP, que tendremos que pagar por ella.

Se puede crear un SVC/LB para un deployment con:
kubectl expose deployment FOO --type=LoadBalancer --port=1234 --target-port=1234

Ahora mismo la integración de Kubernetes con los Cloud Providers está integrada en el código.
Parece que a partir de la versión ¿1.12? va a existir una clara separación gracias a Cloud Controller Manager
https://kubernetes.io/docs/tasks/administer-cluster/developing-cloud-controller-manager/

Existen opciones para poder usar Type:LoadBalancer en bare metal
https://metallb.universe.tf/
  asigna IPs de un rango que le hayamos pasado y hace que uno de los nodos del cluster responda a las peticiones ARP para esa IP
  Otra opción es que usen BGP

Cloud providers no integrados directamente en el código: https://kubernetes.io/docs/tasks/administer-cluster/running-cloud-controller.md#examples

Ejemplo:
apiVersion: v1
kind: Service
metadata:
  name: db-mariadb-slave-lb
spec:
  ports:
  - name: mysql
    port: 3306
    protocol: TCP
    targetPort: mysql
  selector:
    app: mariadb
    component: slave
    release: db
  sessionAffinity: None
  type: LoadBalancer




## ExternalName
Crea un alias DNS (CNAME).
Lo utilizaremos cuando queremos que una app de kubernetes necesite usar un servicio externo, pero esté usando el servicio de discovery de kubernetes.
Ejemplo, una app que ataca a mi-redis.prod.svc.CLUSTER
Creamos un ExternalName que asocie mi-redis del proyecto prod a redis.externo.com
Cuando la app ataque a mi-redis.prod.svc.CLUSTER se le devolverá un CNAME redis.externo.com





# Template
kind: Service
apiVersion: v1
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376





# Funcionamiento
https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies

Dos tipos:
 - pasando el tráfico por userspace (app kube-proxy) DEPRECATED
 - usando iptables (kube-proxy configura iptables) (k8s.io/kubernetes/pkg/proxy/iptables/proxier.go)
 - ipvs (mirar más abajo)


Kubernetes chequea periódicamente el selector de los services y guarda el resultado en un objeto Endpoint.
Si queremos ver los endpoints de un service (y comprobar que apunta a donde esperamos)
kubectl get endpoints NOMBRESVC -o yaml



# IPVS
## Nodeport
Crea un servidor virtual y reencamina el tráfico a las IPs de los pods.

Parece que no podemos hacer 127.0.0.1:node_port en los nodos del cluster.
