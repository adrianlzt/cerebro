http://wiki.libvirt.org/

Permitir a otros usuarios ejecutar virsh:
http://libvirt.org/auth.html#ACL_server_unix_perms
http://wiki.libvirt.org/page/SSHPolicyKitSetup
https://www.rockpenguin.com/2014/03/allowing-non-root-users-access-to-libvirt-and-virsh-using-polkit/

/etc/libvirt/libvirtd.conf
Mirar que configuracion tiene unix_sock_auth

Por defecto estará a polkit (si no está defindo tendrá este valor)

Podemos mirar:
ls -la /var/run/libvirt
Y ver los permisos de los sockets, si están a 777 estará usando polkit.

Para permitir a otro usuario el acceso:
vi /etc/polkit-1/localauthority/50-local.d/51-nrpe.pkla
[Allow nrpe libvirt management permissions]
Identity=unix-user:nrpe
Action=org.libvirt.unix.manage
ResultAny=yes
ResultInactive=yes
ResultActive=yes

Hace falta definir el endpoint para que funcione:
virsh -c qemu:///system list --name --state-running
