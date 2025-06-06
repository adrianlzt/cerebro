<https://kubernetes.io/docs/reference/kubernetes-api/service-resources/ingress-v1/#IngressSpec>

Comparativa de ingress controllers: <https://docs.google.com/spreadsheets/d/191WWNpjJ2za6-nbG4ZoUMXMpUK8KlCIosvQB0f-oq3k/edit?gid=907731238#gid=907731238>

<https://kubernetes.io/docs/concepts/services-networking/ingress/>
<https://medium.com/@cashisclay/kubernetes-ingress-82aa960f658e>
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

<https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/multiple-ingress.md#multiple-ingress-controllers>
Si tenemos varios ingress controllers en nuestro cluster, podemos especificar cual queremos usar con (CUIDADO! tener varios ingress controllers y no especificar cual queremos usar provocará problemas):

A partir de la versión 1.18 se crea la IngressClass (para sustituir lo que antes usaba las annotations ingress-class).
<https://kubernetes.io/docs/concepts/services-networking/ingress/#ingress-class>

Para versiones anteriores tendremos que mirar la config de los ingress controllers desplegados para ver que "class" atienden.

```yaml
kind: Ingress
spec:
  ingressClassName: nginx-example
```

La lista de ingress controllers existentes:
<https://kubernetes.io/docs/concepts/services-networking/ingress/#ingress-controllers>

Traefik: <https://docs.traefik.io/user-guide/kubernetes/>

nginx
Cuidado si tenemos muchos ingress, puede empezar a tardar en recargar
<https://itnext.io/kubernetes-ingress-controllers-how-to-choose-the-right-one-part-1-41d3554978d2?gi=3e946ab2b2c>
Este parece que envia directamente a los pods en vez de al service, por performance. Hacen todos lo mismo?

haproxy

Ejemplo básico de la doc:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: minimal-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx-example
  rules:
  - http:
      paths:
      - path: /testpath
        pathType: Prefix
        backend:
          service:
            name: test
            port:
              number: 80
```

Ejemplo solicitando al ingress controller que las peticiones que reciba con "Host: foo.mydomain.com" las envie al Service "foo", puerto 8080, y las "/bar/\*" al service bar puerto 8080

# apiVersion: extensions/v1beta1 # versiones antiguas de k8s

# kind: Ingress

apiVersion: networking.k8s.io/v1
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
  - path: /bar/\*
    backend:
    serviceName: bar
    servicePort: 8080

Ejemplo haciendo un rewrite para uno solo de los paths.
Las peticiones que hagan los clientes a foo.bar/img/XX se reescriben como foo.bar/app/XX.
Ese nuevo path "/app" es matcheado por una de las reglas del ingress que la reenvia al svc adecuado.

annotations:
nginx.ingress.kubernetes.io/configuration-snippet: rewrite ^(/img)(.\*) /app$2 last;

rules:

- host: usync.com
  http:
  paths:
  - path: /
    pathType: Prefix
    backend:
    service:
    name: frontend
    port:
    name: http
  - path: /app
    pathType: Prefix
    backend:
    service:
    name: ceph-obj
    port:
    number: 8081

Ejemplo del ingress de NGINX:
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
annotations: # Opcional, agregar configuración custom
nginx.ingress.kubernetes.io/configuration-snippet: |
more_set_headers "Request-Id: $req_id"; # Opcional, incrementar el tamaño máximo de body http permitido
nginx.ingress.kubernetes.io/proxy-body-size: 500m
name: example
namespace: foo
spec:
rules:
ingressClassName: nginx - host: <www.example.com>
http:
paths: - backend:
serviceName: exampleService
servicePort: 80
path: /

# This section is only required if TLS is to be enabled for the Ingress

tls: - hosts: - <www.example.com>
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

## Opciones

<https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap>

use-forwarded-headers
If true, NGINX passes the incoming X-Forwarded-\* headers to upstreams. Use this option when NGINX is behind another L7 proxy / load balancer that is setting these headers

Annotations y config maps (CUIDADO este es el ingress de nginx INC, no el de kubernetes):
<https://github.com/nginxinc/kubernetes-ingress/blob/master/docs/configmap-and-annotations.md>

# Exponer servicios TCP o UDP

<https://github.com/kubernetes/ingress-nginx/blob/main/docs/user-guide/exposing-tcp-udp-services.md>

# Internals

<https://www.joyfulbikeshedding.com/blog/2018-03-26-studying-the-kubernetes-ingress-system.html>

# Conectar a un backend mediante protocolo https obligatoriamente

Nos puede servir si el backend hace una redirección a https siempre que vayamos por http.
Es el caso de argocd, se deshace el TLS en el ingress y envía la comunicación por http.
Argo, al ver la comunicación por http, nos reenvia al https y hace un círculo de redirecciones.

annotations:
nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"

Con este parámetro le decimos al ingress que la ruta desde nginx a argo la haga vía https.

# Atacar a un service de otro namespace

Mirar ExternalName en service.md

# Basic auth

<https://kubernetes.github.io/ingress-nginx/examples/auth/basic/>
