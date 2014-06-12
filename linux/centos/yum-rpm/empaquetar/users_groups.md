http://fedoraproject.org/wiki/Packaging%3aUsersAndGroups

Si necesitamos agregar usuarios o grupos al sistema.
Lo haremos en la sección %pre.

Hay dos posibilidades, con UID/GID predeterminado o dinámico.

Dinámico es el más sencillo (el Requires meterlo antes del %description):

Requires(pre): shadow-utils
[...]
%pre
getent group GROUPNAME >/dev/null || groupadd -r GROUPNAME
getent passwd USERNAME >/dev/null || \
    useradd -r -g GROUPNAME -d HOMEDIR -s /sbin/nologin \
    -c "Useful comment about the purpose of this account" USERNAME
exit 0
