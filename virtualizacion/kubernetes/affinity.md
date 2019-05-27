Las reglas de affinity y taints nos permiten jugar con donde se deben desplegar las cosas.


# Taint
https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/

taint es lo contrario a affinity. Se rechaza a los pods.

Las "tolerations" se pueden especificar en un pod para poder ser desplegado en un nodo a pesar de tener un taint que hace match.


Taint configurado por kubespray para los servidores que son "master" pero no "nodes".
node-role.kubernetes.io/master:NoSchedule

Ciertos pods del namespace kube-system se desplegarán de todas maneras:
  calico (red)
  kube-apiserver
  kube-controller-manager
  kube-proxy
  nodelocaldns
