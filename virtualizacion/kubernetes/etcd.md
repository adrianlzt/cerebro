https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd
https://software.danielwatrous.com/using-and-troubleshooting-etcd-in-kubernetes/

https://github.com/jpbetz/auger
para poder leer la conf de kubernetes directamente de etcd

Configuración en /etc/etcd.env

Hay una unit de systemd que levanta/para el container de etcd


Chequear a mano el estado del cluster
cd /etc/ssl/etcd/ssl
curl -v --cacert ./ca.pem --cert ./member-colo02bp.pem --key member-colo02bp-key.pem https://127.0.0.1:2379/health

Lista de miembros configurada para el server etcd en cada server:
grep ETCD_INITIAL_CLUSTER=etcd /etc/etcd.env | sed "s/,etcd[0-9]=/,/g" | cut -d '=' -f 3


Con etcdV2, mirar ejecutar comandos:
etcdctl --cert-file /etc/ssl/etcd/ssl/admin-$(hostname).pem --key-file /etc/ssl/etcd/ssl/admin-$(hostname)-key.pem --ca-file /etc/ssl/etcd/ssl/ca.pem --endpoints https://10.0.2.26:2379 member list
etcdctl --cert-file /etc/ssl/etcd/ssl/admin-$(hostname).pem --key-file /etc/ssl/etcd/ssl/admin-$(hostname)-key.pem --ca-file /etc/ssl/etcd/ssl/ca.pem --endpoints https://10.0.2.26:2379 cluster-health
  para chequear el estado del cluster


Con etcdV3
ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 --cacert=/etc/ssl/etcd/ssl/ca.pem --cert=/etc/ssl/etcd/ssl/member-$(hostname).pem --key=/etc/ssl/etcd/ssl/member-$(hostname)-key.pem member list
ETCDCTL_API=3 etcdctl --endpoints=https://10.0.2.14:2379 --cacert=/etc/ssl/etcd/ssl/ca.pem --cert=/etc/ssl/etcd/ssl/member-$(hostname).pem --key=/etc/ssl/etcd/ssl/member-$(hostname)-key.pem get --prefix --keys-only /


https://coreos.com/etcd/docs/latest/v2/members_api.html
Lista de nodos del cluster:
curl --cacert ./ca.pem --cert ./member-colo02bp.pem --key member-colo02bp-key.pem https://127.0.0.1:2379/v2/members | python -m json.tool

