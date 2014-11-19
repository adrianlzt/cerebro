http://nfsv4.bullopensource.org/doc/NAGIOS_Design.php
  Analisis de que monitorizar de un server nfs

http://www.cyberciti.biz/faq/centos-fedora-rhel-iptables-open-nfs-server-ports/
Asignación de puertos dinámica. Complejo.

# CentOS

## NFSv2 NFSv3

Procesos:
rpcbind (no propiamente de nfs, pero necesario)
rpc.statd
rpc.rquotad
rpc.mountd
rpc.idmapd
nfsd

Puertos:
111/TCP (rpcbind)
875/TCP (rquotad)
2049/TCP (nfs)

/usr/lib64/nagios/plugins/check_procs -C nfsd -c 1:
/usr/lib64/nagios/plugins/check_procs -C rpcbind -c 1:
/usr/lib64/nagios/plugins/check_procs -C rpc.statd -c 1:
/usr/lib64/nagios/plugins/check_procs -C rpc.rquotad -c 1:
/usr/lib64/nagios/plugins/check_procs -C rpc.mountd -c 1:
/usr/lib64/nagios/plugins/check_procs -C rpc.idmapd -c 1:
/usr/lib64/nagios/plugins/check_tcp -H 127.0.0.1 -p 111
/usr/lib64/nagios/plugins/check_tcp -H 127.0.0.1 -p 875
/usr/lib64/nagios/plugins/check_tcp -H 127.0.0.1 -p 2049
/usr/lib64/nagios/plugins/check_rpc -H 127.0.0.1 -C nfs
/usr/lib64/nagios/plugins/check_rpc -H 127.0.0.1 -C portmapper
/usr/lib64/nagios/plugins/check_rpc -H 127.0.0.1 -C rquotad

Con el server bien configuracion nos da este error, por lo que no chequeo el nlockmgr
/usr/lib64/nagios/plugins/check_rpc -H 127.0.0.1 -C nlockmgr
CRITICAL: RPC program nlockmgr version 2 udp is not running, version 1 version 3 version 4 udp is running






## NFSv4
Comprobar que es asi. En centos un bug del kernel impide usar nfsv4 sin rpcbind

Procesos:
nfsd

Puertos:
2049/TCP (nfs)
