http://docs.openstack.org/admin-guide-cloud/content/section_metadata-service.html

curl http://169.254.169.254/1.0/meta-data/

Nos da info bastante básica.
No útil para obtener que instancia es (nos da el id dentro del hypervisor) o a que tenant pertenece.
Tambien contiene el user-data (script para ejecutar al inicio) y las claves publicas a insertar.

Esa ip llega al qrouter donde es enrutada a un agente que conecta mediante unix socket al servidor de metadatos.


Consultar/definir metadata con nova:
nova metadata NOMBRESERVER set key=value
nova metadata NOMBRESERVER delete key
nova show NOMBRESERVER | grep metadata



# Como funciona

La IP 169.254.169.254 es una IP “mágica” que se encamina por la puerta de enlace por defecto de las máquinas virtuales. Es decir, se manda a través del router virtual. El router virtual tiene una regla en su cortafuegos que hace un DNAT:

[root@esjc-ostt-cc04l etc]# ip netns exec qrouter-988aacf9-fa3f-4b6d-b73c-d7ab698d2231 iptables -t nat -L -n –v
…
Chain neutron-l3-agent-PREROUTING (1 references)
 pkts bytes target     prot opt in     out     source               destination         
  607 31564 REDIRECT   tcp  --  *      *       0.0.0.0/0            169.254.169.254     tcp dpt:80 redir ports 9697 
…

Es decir, el tráfico a esa IP mágica se reenvía al puerto 9697 dentro del espacio de nombres del router virtual. En ese puerto, está un proceso Python denominado neutron-ns-metadata-proxy que lo que hace es reenviar a su vez la petición al servicio de metadatos de Nova.
