https://coredns.io
https://coredns.io/2017/06/08/how-queries-are-processed-in-coredns/

Servidor DNS simple
Escrito en go
Usado por kubernetes mediante un plugin.


# Kubernetes
Acceso por el servicio "coredns".
Parece que hay pods (nodelocaldns) en cada nodo que reenvian las peticiones al servidor
Estos tiene su propio configmap que envia las peticiones de nuestro dns_name (dominio del cluster) a coredns, y el resto al resolv.conf del host


Corefile usado

.:53 {
    errors
    health
    kubernetes kube.usync.us in-addr.arpa ip6.arpa {
      pods insecure
      upstream /etc/resolv.conf
      fallthrough in-addr.arpa ip6.arpa
    }
    prometheus :9153
    forward . /etc/resolv.conf
    cache 30
    loop
    reload
    loadbalance
}


Podemos modificar el ConfigMap y los pods de coredns se actualizarán.
