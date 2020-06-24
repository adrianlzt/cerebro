https://docs.projectcalico.org

El projecto usado mayoritariamente para gestionar la red en Kubernetes.
Usa enrutado a nivel 3 (IP).
En los nodos usa el balanceo IPVS.

Calico usa por debajo, como backend, el software de routing bird.
/etc/calico/confd/config/bird.cfg


# cli / calicoctl

## configuración
Tendremos que ver si tenemos configurado calico para usar etcd o el datastore de kubernetes.
kc get configmaps calico-config -o yaml
  si vemos keys de etcd, usa etcd. Si usa kubernetes veremos datastore_type: kubernetes

Para etcd tendremos que definir el fichero con los endpoints y los certificados.
Ejemplo:
apiVersion: projectcalico.org/v3
kind: CalicoAPIConfig
metadata:
spec:
  datastoreType: "etcdv3"
  etcdEndpoints: "https://10.0.0.14:2379,https://10.0.0.26:2379"
  etcdKeyFile: "admin-nodeA-key.pem"
  etcdCertFile: "admin-nodeA.pem"
  etcdCACertFile: "ca.pem"

calicoctl get -c calico.yaml nodes


Para datastore kubernetes:
DATASTORE_TYPE=kubernetes KUBECONFIG=~/.kube/config calicoctl get bgpConfig



## BGP
Configuración BGP, podemos ver el ASN para poder configurarlo en otro peer:
calicoctl get bgpConfiguration


## Peer
Configurar un peer:

apiVersion: projectcalico.org/v3
kind: BGPPeer
metadata:
  name: some.name
spec:
  peerIP: 192.168.1.1
  asNumber: 63400
  # Con las siguientes configs seleccionamos sobre que hosts de k8s aplicar estas reglas de BGP
  #node: rack1-host1
  #nodeSelector: example.com/bgp == 'calico'

  # Esta es para seleccionar nodos de k8s como peers. Tendremos que dejar sin definir peerIP y asNumber
  #peerSelector:

calicoctl create -f config.yaml



# Troubleshooting
https://docs.projectcalico.org/maintenance/troubleshoot/troubleshooting#:~:text=Error%3A%20calico%2Fnode%20is%20not,is%20allowed%20in%20the%20environment.


Error: calico/node is not ready: BIRD is not ready: BGP not established with 10.0.0.1
Si es porque tenemos nodos parados, tendremos que decomisionarlos
https://docs.projectcalico.org/maintenance/decommissioning-a-node

calicoctl delete -c calico.yaml node HOSTNAME


Problemas conexión.
  tenemos conex entre pods? Probar ping y luego algo tcp (curl a algún servicio http por ejemplo)
  de pods a services? (misma prueba que arriba)



Desde dentro de los nodos de k8s:
calicoctl node status

