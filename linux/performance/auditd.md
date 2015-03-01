#http://www.cyberciti.biz/tips/linux-audit-files-to-see-who-made-changes-to-a-file.html

Nos sirve para guardar registro de cualquier cambio que se produzca en nuestro sistema: ficheros, syscalls, etc
Se debe ejecutar como root.

Mostrar todas las reglas:
# auditctl -l

Vigila el fichero /etc/passwd ante lecturas(r), escrituras(w), ejecuciones(x) y atributos(a)
Le asigna la palaba "password-file", para poder luego buscar estas interacciones
# auditctl -w /etc/passwd -p rwxa -k password-file
  IMPORTANTE! Poner -w primero y luego -p

El path debe ser absoluto.

Para buscar sucesos:
Por clave
# ausearch -ik clave

Por comando que lo abre/ejecuta/escribe/añade
# ausearch -ic cmd

Por fichero:
# ausearch -if /path/to/file

Si queremos que traduzca los números (por ejemplo, uid por nombre)
# ausearch -i ...

En la fecha o posterior:
# ausearch -ts "22/8/14" "9:37:41"

Borrar todas las reglas (dara como resultado un 'No rules', es lo correcto)
# auditctl -D

O alguna en concreto:
-d <l,a>            Delete rule from <l>ist with <a>ction
                        l=task,exit,user,exclude
			a=never,always

Para borrar los resultados deberemos borrar los ficheros que están en /var/log/auditd/


Auditar el comando kill -9
auditctl -a always,exit -S kill -F a1=9

To see files opened by a specific user:
auditctl -a always,exit -S open -F auid=510

To see unsuccessful open calls:
auditctl -a always,exit -S open -F success=0

To see if an admin is accessing other user's files:
auditctl -a always,exit -F dir=/home/ -F uid=0 -C auid!=obj_uid


Meter reglas persistentes:
/etc/audit/rules.d/audit.rules



En las debian no viene instalado por defecto:
apt-get install auditd
service auditd start


Parece que con LXC no funciona
