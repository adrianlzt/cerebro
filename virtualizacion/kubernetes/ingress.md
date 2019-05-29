https://kubernetes.io/docs/concepts/services-networking/ingress/
https://medium.com/@cashisclay/kubernetes-ingress-82aa960f658e
Mirar network para discusión ingress vs Service

Ingress es una API para definir las reglas de un balanceador.
Luego podremos tener varios controladores que leeran esas reglas e implementarán la configuración necesaria para hacer que esas reglas funcionen.
Los ingress controllers tendrán por una parte una parte que se registrará contra los cambios en kubernetes para recibir los ingress.
Por otro lado tendrán el software de balanceo, haproxy o nginx por ejemplo.

Al desplegar estos controllers a su vez ellos necesitan un método de aceptar el tráfico.
El método que suelen usar es un service LoadBalancer, que en entornos cloud asocia una IP pública a ese service.


Balanceador para permitir el mapeo de dominios a pods.
Para un dominio determinado (y un path opcional), definimos que "backend" servirá las peticiones.

Tenemos que configurar un Service/NodePort o Service/LoadBalancer para que le llegue el tráfico al Ingress Controller.

En bare metal tendríamos un load balancer externo apuntando a un puerto determinado de todos los nodos.
En ese puerto habría un NodePort reencaminado el tráfico hacia el Ingress Controller.
El Ingress Controller miraría las reglas definidas (Ingress resources) y decidiría a quien enviar la petición.
  An Ingress Controller is a daemon, deployed as a Kubernetes Pod, that watches the apiserver's /ingresses endpoint for updates to the Ingress resource. Its job is to satisfy requests for Ingresses
  Para poder hacer esto, la ServiceAccount tendrá que tener acceso sobre esa API (en la doc de traefik enseñan como es necesario ese role)
  Para acceder a la API usará el secret que estará en /var/run/secrets/kubernetes.io/serviceaccount

Limitación de que todos los Ingress para ese Ingress Controller tienen que usar el mismo protocolo de capa 7 (http por ejemplo)


https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/multiple-ingress.md#multiple-ingress-controllers
Si tenemos varios ingress controllers en nuestro cluster, podemos especificar cual queremos usar con (CUIDADO! tener varios ingress controllers y no especificar cual queremos usar provocará problemas):
metadata:
  name: foo
  annotations:
    kubernetes.io/ingress.class: "nginx"


La lista de ingress controllers existentes:
https://kubernetes.io/docs/concepts/services-networking/ingress/#ingress-controllers

Traefik: https://docs.traefik.io/user-guide/kubernetes/

nginx
Cuidado si tenemos muchos ingress, puede empezar a tardar en recargar
https://itnext.io/kubernetes-ingress-controllers-how-to-choose-the-right-one-part-1-41d3554978d2?gi=3e946ab2b2c
Este parece que envia directamente a los pods en vez de al service, por performance. Hacen todos lo mismo?

haproxy



Ejemplo solicitando al ingress controller que las peticiones que reciba con "Host: foo.mydomain.com" las envie al Service "foo", puerto 8080, y las "/bar/*" al service bar puerto 8080
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: my-ingress
spec:
  # default backend (si no pilla ninguna regla)
  backend:
    serviceName: other
    servicePort: 8080
  rules:
  - host: foo.mydomain.com
    http:
      paths:
      - backend:
          serviceName: foo
          servicePort: 8080
  - host: mydomain.com
    http:
      paths:
      - path: /bar/*
        backend:
          serviceName: bar
          servicePort: 8080



Ejemplo del ingress de NGINX:
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
  name: example
  namespace: foo
spec:
  rules:
    - host: www.example.com
      http:
        paths:
          - backend:
              serviceName: exampleService
              servicePort: 80
            path: /
  # This section is only required if TLS is to be enabled for the Ingress
  tls:
      - hosts:
          - www.example.com
        secretName: example-tls

If TLS is enabled for the Ingress, a Secret containing the certificate and key must also be provided:

apiVersion: v1
kind: Secret
metadata:
  name: example-tls
  namespace: foo
data:
  tls.crt: <base64 encoded cert>
  tls.key: <base64 encoded key>
type: kubernetes.io/tls




# Internals
https://www.joyfulbikeshedding.com/blog/2018-03-26-studying-the-kubernetes-ingress-system.html
