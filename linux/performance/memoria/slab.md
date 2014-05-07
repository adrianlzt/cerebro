Aqui suelen almacenarse los metadatos del sistema de ficheros.
  dentry -> directorios
  inodos -> ficheros

Slabcache:
Se usa para reutilizar objetos en vez de destruirlos y volverlos a crear (más costoso).
Se deja el objeto y se modifican los parámetros necesarios (por ejemplo número de inodo)

Comandos:
slabtop
cat /proc/slabinfo
vmstat -m

