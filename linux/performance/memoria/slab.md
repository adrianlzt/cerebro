https://www.toofishes.net/blog/linux-command-day-slabtop/

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
atop


con el drop caches podemos liberar esa memoria:
sync; echo 2 > /proc/sys/vm/drop_caches

Podemos ver el tamaño de las tablas de cache con dmesg:
Dentry cache hash table entries: 2097152 (order: 12, 16777216 bytes)
Inode-cache hash table entries: 1048576 (order: 11, 8388608 bytes)
linux/kernel/path-lookup.md


Para probar como se llena la cache podemos hacer:
find / 2>& /dev/null

Generar todas las entradas en la dcache que queramos, intentando abrir ficheros que no existen:
python -c 'exec("def x(f):\n try: open(f,\"r\")\n except: pass"); [f for f in range(0,1000000) if x("/var/tmp/%s" % f)]'

Si lo ejecutamos intentando abrir 10M ficheros, la dcache ocupará un espacio de unos 2GB (0.19K por 10M)

