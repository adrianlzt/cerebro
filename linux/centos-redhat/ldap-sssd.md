Fedora/CentOS/RedHAT usa el demonio sssd para LDAP.
https://fedorahosted.org/sssd

Para usarlo se define en el /etc/nsswitch.conf como sss

Si da problemas, reiniciarlo: service sssd restart


getent se puede utilizar para comprobar si la comunicación con LDAP está siendo correcta: getent passwd usuario.
Este comando puede cachear (o ldap, o sssd es quien cachea, no se).
Podemos poner un tcpdump host server.ldap para ver si esta realizando las peticiones
