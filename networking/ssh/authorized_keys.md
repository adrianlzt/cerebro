https://unix.stackexchange.com/a/490120

Si queremos filtrar el acceso por ssh para un usuario determinado y una IP origen determinada, podemos hacer uso de una sintaxis especial del authorized_keys

from="192.168.1.*,192.168.2.*" ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABA...etc...mnMo7n1DD useralias


Más opciones disponibles
https://serverfault.com/a/143004
https://man.openbsd.org/OpenBSD-current/man8/sshd.8#AUTHORIZED_KEYS_FILE_FORMAT
