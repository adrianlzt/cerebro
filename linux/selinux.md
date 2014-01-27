# getenforce  //nos dice como esta configurado actualmente
Enforcing -> activado
Permissive -> no activado

Para desactivarlo (no sobrevive a un reinicio)
# setenforce 0

Para desactivarlo permanentemente
/etc/sysconfig/selinux:
SELINUX=permissive


Mas info sobre el estado:
sestatus
