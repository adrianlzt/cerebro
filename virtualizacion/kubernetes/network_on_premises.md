Si desplegamos K8s sobre nuestro propio metal podemos usar BGP para dar acceso al resto de la red a la red de kubernetes.

Usando calico podemos configurar los nodos para que exporten las redes de k8s usando BGP.
Necesitaremos tener un router que hable BGP.

El resto de las máquinas no-k8s, cuando intenten acceder a una IP de k8s, saltarán a su ruta por defecto, el router y este los redirigirá a los nodos de k8s.


Si queremos tener LoadBalancer podemos usar MetalLB.
Un problema es que metallb también usa BGP (puede usar ARP pero no escala bien).
Una solución es elegir un subgrupo de los nodos de cluster para que exporten el BPG de calico y el resto el BGP de metallb.
