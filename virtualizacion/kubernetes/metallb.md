https://metallb.universe.tf/

Dos opciones.

# Layer 2 / ARP
La primera es que los nodos contesten por ARP a las IPs que se expogan como LoadBalancer.
Problema: single-node bottlenecking, and potentially slow failover


# BGP
Los nodos exportan las IPs de los LoadBalancers con el protocolo BGP a los routers.
Necesitamos tener un router que hable BGP.

Si una sesión BGP se termina (se cae un nodo por ejemplo), las conexiones tendrán un corte de conexión.
Mirar "Limitations" para acciones que podemos tomar: https://metallb.universe.tf/concepts/bgp/


Ejemplo de config configurando solo los nodo labeled como "example.com/bgp=metallb" para que exporten el rango 10.0.0.64/27, poniendo como peer al nodo 10.0.0.27
configInline:
  peers:
    - peer-address: 10.0.0.27
      peer-asn: 65002
      my-asn: 64800
  address-pools:
    - name: default
      protocol: bpg
      addresses:
        - 10.0.0.64/27
speaker:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: example.us/bgp
            operator: In
            values:
            - metallb


Desplegar con helm:
helm3 install metallb stable/metallb -f values.yaml
