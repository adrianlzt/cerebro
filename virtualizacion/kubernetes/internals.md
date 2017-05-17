# Service / Interlad load balancer / VIPs
https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies

Depende de la versión de kubernetes se usa kube-proxy o iptables para enrutar las VIPs


Ejemplo de enrutamiento de una VIP (172.30.25.192) con iptables (tabla NAT):

Caso con un único nodo:
-A KUBE-SERVICES -d 172.30.15.111/32 -p tcp -m comment --comment "myproject/golang-ex: cluster IP" -m tcp --dport 8080 -j KUBE-SVC-QPU4NZGK4PYP7ZAX
-A KUBE-SVC-QPU4NZGK4PYP7ZAX -m comment --comment "myproject/golang-ex:" -j KUBE-SEP-D53RNXHWOOWFZTBW
-A KUBE-SEP-D53RNXHWOOWFZTBW -p tcp -m comment --comment "myproject/golang-ex:" -m tcp -j DNAT --to-destination 172.17.0.2:8080


Con tres nodos:
-A KUBE-SERVICES -d 172.30.15.111/32 -p tcp -m comment --comment "myproject/golang-ex: cluster IP" -m tcp --dport 8080 -j KUBE-SVC-QPU4NZGK4PYP7ZAX

-A KUBE-SVC-QPU4NZGK4PYP7ZAX -m comment --comment "myproject/golang-ex:" -m statistic --mode random --probability 0.33332999982 -j KUBE-SEP-D53RNXHWOOWFZTBW
-A KUBE-SVC-QPU4NZGK4PYP7ZAX -m comment --comment "myproject/golang-ex:" -m statistic --mode random --probability 0.50000000000 -j KUBE-SEP-ON4GQNL6LILTP6IO
-A KUBE-SVC-QPU4NZGK4PYP7ZAX -m comment --comment "myproject/golang-ex:" -j KUBE-SEP-QMOBW5AJILZINN2P

-A KUBE-SEP-D53RNXHWOOWFZTBW -s 172.17.0.2/32 -m comment --comment "myproject/golang-ex:" -j KUBE-MARK-MASQ
-A KUBE-SEP-D53RNXHWOOWFZTBW -p tcp -m comment --comment "myproject/golang-ex:" -m tcp -j DNAT --to-destination 172.17.0.2:8080

-A KUBE-SEP-ON4GQNL6LILTP6IO -s 172.17.0.5/32 -m comment --comment "myproject/golang-ex:" -j KUBE-MARK-MASQ
-A KUBE-SEP-ON4GQNL6LILTP6IO -p tcp -m comment --comment "myproject/golang-ex:" -m tcp -j DNAT --to-destination 172.17.0.5:8080

-A KUBE-SEP-QMOBW5AJILZINN2P -s 172.17.0.6/32 -m comment --comment "myproject/golang-ex:" -j KUBE-MARK-MASQ
-A KUBE-SEP-QMOBW5AJILZINN2P -p tcp -m comment --comment "myproject/golang-ex:" -m tcp -j DNAT --to-destination 172.17.0.6:8080

-A KUBE-MARK-MASQ -j MARK --set-xmark 0x4000/0x4000
-A KUBE-POSTROUTING -m comment --comment "kubernetes service traffic requiring SNAT" -m mark --mark 0x4000/0x4000 -j MASQUERADE

