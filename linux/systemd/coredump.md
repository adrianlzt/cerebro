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
