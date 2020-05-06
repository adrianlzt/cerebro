https://github.com/opencontainers/runc

CLI tool for spawning and running containers according to the OCI specification https://www.opencontainers.org/


# cgroups
Esta libreria es la que gestiona la comunicación con los cgroups para limitar los recursos
https://github.com/opencontainers/runc/tree/master/libcontainer/cgroups


# Admin
Por defecto root usa el dir /run/runc

Los rootless tienen su dir en:
/run/user/ID/runc

Si no pueden usar ese path usarán:
/tmp/run-ID/runc

## List
Podemos ver los pods running con
runc list
runc --root /tmp/run-$(id -u)/runc list

## Kill/Stop
runc kill XXX KILL


