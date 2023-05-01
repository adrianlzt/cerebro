Para lo que suele generar los core dump, mirar segmentation_fault.md

ulimit -c
nos dice el tamaño máximo de un fichero core (0 es que no se genere)

/proc/sys/kernel/core_pattern
nos dice el nombre con el que se va a generar el fichero, típicament en el workdir con nombre core.NUMPID


Activar cores y guardarlos en un dir determinado:
ulimit -c unlimited
mkdir /var/cores
echo "/var/cores/core.%e.%p" > /proc/sys/kernel/core_pattern
To make the core_pattern permanent, and survive reboots, you can set it via "kernel.core_pattern" in /etc/sysctl.conf.


Con systemd se usa un comando que almacena los cores:
$ cat /proc/sys/kernel/core_pattern
|/usr/lib/systemd/systemd-coredump %P %u %g %s %t %c %h



# GDB

gdb -c core.xxx


## Python
gdb `which python` core.xxxx




# Systemd
http://www.freedesktop.org/software/systemd/man/coredumpctl.html
http://stackoverflow.com/a/14082174

Se almacenan binariamente con journalctl.
Si queremos sacar uno a un fichero:

coredumpctl dump -o coredump 1549


# Ubuntu
https://askubuntu.com/a/1349048
https://wiki.ubuntu.com/Apport

cat /proc/sys/kernel/core_pattern
|/usr/share/apport/apport -p%p -s%s -c%c -d%d -P%P -u%u -g%g -- %E

Note that even if ulimit is set to disabled core files (by specyfing a core file size of zero using ulimit -c 0), apport will still capture the crash.

Los core dumps los almacena en
/var/lib/apport/coredump
