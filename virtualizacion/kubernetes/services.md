https://kubernetes.io/docs/concepts/services-networking/service/

Es la abstracción por encima de los PODs para que otros PODs puedan usar a los primeros.
Ejemplo, un backend que es accedido por un frontend.

El service decidirá a que pods ataca según un selector (una label con un valor).



# Tipos

## ClusterIP
Por defecto, crea una VIP alcanzable internamente dentro del cluster
La VIP llevará el tráfico a los POD con cierta label.


## NodePort
https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport
Expone un puerto (por defecto rango 30000-32767) en todos los nodos del cluster que redirigirá el tráfico a nuestro Service.
Crea automaticamente un ClusterIP

Útil si tenemos nuestros propios LBs.
Útil para tráfico no HTTP, HTTPS o TLS SNI.


## LoadBalancer
https://kubernetes.io/docs/concepts/services-networking/service/#type-loadbalancer
Crea un LB sobre la plataforma en la que estemos, por ejemplo en AWS. Es una abstracción sobre la cloud en la que estemos.
Crea automáticamente un NodePort y un ClusterIP



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
