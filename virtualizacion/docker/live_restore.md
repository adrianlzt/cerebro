https://docs.docker.com/engine/admin/live-restore/

Keep containers alive during daemon downtime


No compatible con SWARM mode


En kubernetes hay una PR abierta: https://github.com/kubernetes/kubernetes/pull/40364
Pero parece que no esta oficialmente soportado

En RHEL7.3 parece que hay un bug que hace que no funcione:
https://bugzilla.redhat.com/show_bug.cgi?id=1419877
It is a goal to get this fixed in RHEL 7.4+
