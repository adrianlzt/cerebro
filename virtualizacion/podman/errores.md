# Errores
chown: changing ownership of ‘/var/lib/zabbix/.local/share/containers/storage/overlay/l’: Operation not permitted
Parece que me daba si intentaba ejecutar "podman info" (o cualquier cosa) en un dir donde no tenía permisos.


error configuring CNI network plugin: failed to add watch on "/etc/cni/net.d/": no space left on device
https://github.com/containers/libpod/issues/1566
Arreglado con:
sysctl -w fs.inotify.max_user_instances=4096
sysctl -w fs.inotify.max_user_watches=65536



Permission denied
https://www.redhat.com/sysadmin/container-permission-denied-errors
Si tenemos algún error raro de permission denied, iremos probando con selinux, apparmor, capabilities, privileged, seccomp, etc.

Mostrar capabilities
capsh --print

Caso curioso que da error al leer /proc/PID/{cwd,exe,root}. Se "arregla" añadiendo la capability sys_ptrace.

➜ podman run --rm -it --entrypoint sh alpine -c '(su -s /bin/sh sync -c "sleep infinity" &) && sleep 1 && ls /proc/$(pgrep sleep)/root'
ls: /proc/3/root: Permission denied

➜ podman run --cap-add sys_ptrace --rm -it --entrypoint sh alpine -c '(su -s /bin/sh sync -c "sleep infinity" &) && sleep 1 && ls /proc/$(pgrep sleep)/root'
bin    dev    etc    home   lib    media  mnt    opt    proc   root   run    sbin   srv    sys    tmp    usr    var

https://github.com/moby/moby/issues/40713
Permission to dereference or read (readlink(2)) this symbolic link is governed by a ptrace access mode PTRACE_MODE_READ_FSCREDS check; see ptrace(2).
