Podemos hacer strace a un proceso running ejecutándolo desde el host.

Si queremos ejecutar strace desde dentro del container tenemos que pasar unas opciones especiales:
http://blog.johngoulah.com/2016/03/running-strace-in-docker/
--cap-add SYS_PTRACE
