http://wiki.libvirt.org/

# Instalacion
sudo apt-get install libvirt-bin


Hace falta definir el endpoint para que funcione:
virsh -c qemu:///system list --name --state-running


virsh #
  help - ayuda
  help cmd - ayuda comand cmd
  list - ver maquinas corriendo

# VirtualBox
virsh -c vbox:///session

Localmente funciona, pero no se puede hacer vbox+ssh://


# Comandos
start <domain> --console
  arranca y nos attacha a la consola de la máquina
  Control+5 para salir de la consola

console <domain>

reset <domain>
  Restablecer un dominio. Lo apaga

reboot <domain>



# Permitir a otros usuarios ejecutar virsh:
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

