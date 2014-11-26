Obtener la firma de un host para meterlo en el known_hosts

ssh-keyscan -H localhost > known_hosts


Para system-wide
/etc/ssh/ssh_known_hosts


Para evitar chequear este fichero:
    UserKnownHostsFile     /dev/null
o para la cli:
ssh -o UserKnownHostsFile=/dev/null ...
