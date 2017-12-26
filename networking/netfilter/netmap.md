https://github.com/alibaba/ali_kernel/blob/master/net/ipv4/netfilter/ipt_NETMAP.c

La idea de este módulo es evitar un overlap de redes, pensando para ponerse en el lado del servidor.


Si entiendo bien el código hace:
Si metemos un NETMAP en PREROUTING, cuando entra un paquete, la destination IP se modifica según la regla especificada

Si metemos un NETMAP en POSTROUTING, la source ip se modifica segun la regla especificada



iptables -t nat -A POSTROUTING -d 192.168.1.0/24 -j NETMAP --to 10.11.0.0/24
esto hace que cuando se envia un paquete a 192.168.1.0, la ip source se pone a 10.11.0.n
