https://kubernetes.io/docs/concepts/services-networking/ingress/
https://medium.com/@cashisclay/kubernetes-ingress-82aa960f658e

Balanceador para permitir el mapeo de dominios a pods.
Para un dominio determinado (y un path opcional), definimos que "backend" servirá las peticiones.


En bare metal tendríamos un load balancer externo apuntando a un puerto determinado de todos los nodos.
En ese puerto habría un NodePort reencaminado el tráfico hacia el Ingress Controller.
El Ingress Controller miraría las reglas definidas (Ingress resources) y decidiría a quien enviar la petición.
