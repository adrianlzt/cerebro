http://linux.die.net/man/8/logrotate

Ejecutado por:
/etc/cron.daily/logrotate

Conf:
/etc/logrotate.conf
/etc/logrotate.d/

Se hace caso a la instrucción que ultimo se lea (si ponemos varios "daily x", solo hará caso a la última)

Fichero de estado:
/var/lib/logrotate.status

En este fichero se guarda la fecha del último rotado.
Si usamos rotado por fecha, se consultará esta fecha para decidir si rotar.
Si ejecutamos logrotate por nuestra cuenta meterá su entrada en el fichero de estado sin tocar al resto

No se puede definir dos políticas de rotado para el mismo fichero:
"duplicate log entry for"

Cuidado con el orden de las instrucciones.
Si ponemos por ejemplo:
  daily
  size 1M
Solo hará caso a la última, solo rotará por tamaño.
NO se pueden poner dos reglas simultáneamente.

As of logrotate 3.8.1, maxsize and timeperiod are supported
maxsize & timeperiod rotate when either size exceeds maxsize, or after elapsed timeperiod. logrotate may need to be run more than the default once per day in this case.

Si rotamos por tamaño cuidado con el formato, que no se pisen los ficheros. Mirar ejemplo con postgres más abajo.


Cuando rotar:
size n[k|M|G] : rota cuando el tamaño del fichero sea mayor del especificado
minsize n[k|M|G] : rota cuando el tamaño del fichero es mayor del espeficado y también se cumple una orden temporal (daily, weekly, monthly)
daily. Se suele poner a 1 para no rotar ficheros vacios.
weekly: rota cuando el día de la semana es menor que el día del último rotado, o si ha pasado más de una semana desde el último rotado
monthly: rota el primer día de cada mes (si logrotate corre todos los días, si no, el primer día que se ejecute logrotate en el mes)

Cuanto rotar y como:
rotate n : mantiene n ficheros. Si ponemos 0, no mantiene ficheros antiguos.
maxage count : elimina ficheros rotados mayores que count días
notifempty: Do not rotate the log if it is empty (this overrides the ifempty option).
missingok: If the log file is missing, go on to the next one without issuing an error message. See also nomissingok.
delaycompress: mantiene el ultimo fichero rotado sin comprimir. Esquema de nombrado: nombre -> nombre.1 -> nombre.2.gz
nodelaycompress
reload: el fichero antiguo se mueve a uno nuevo, y se pide al proceso que escribe que vuelva a abrir el fichero de log. OPCION RECOMENDADA
copytruncate: copia el fichero y luego lo trunca (echo "" > fichero). Pueden perderse algunos datos que se escriban entre el copiado y el truncado. Esto es útil para algunos programas que no podemos decirles que vuelvan a abrir el fichero de log, y se mantenga escribiendo al mismo file descriptor
create mode owner group: permisos y dueños del nuevo fichero que se crea tras el rotado.
compress: comprimir archivos antiguos
sharedscripts: solo ejecutamos el prescript y/o postscript una vez (para el caso de tener varios ficheros en el mismo logrotate). No se ejecuta nada si no se rota.
dateext: use date as a suffix of the rotated file



/var/log/fichero.log {
  daily # rota cada dia
  maxsize 100M # maximo tamaño de 100M; ejecutar varias veces al dia; solo logrotate > 3.8.1
  minsize 1 # no rota si el fichero esta vacio
  rotate 10 # mantiene 10 ficheros
  compress
  delaycompress
  missingok
  notifempty
  copytruncate
  dateext
  create
}


Mantiene 5 ficheros (el log principal, último rotado sin comprimir, y 4 más comprimidos)
Los rota cada semana si ocupan al menos 5MB

/var/log/cluster/corosync.log {
  minsize 5M
  weekly
  rotate 5
  compress
  delaycompress
  missingok
  notifempty
  create 640 root root
}

Si tenemos logs que se generan con el syslog (o rsyslog) tenemos que reiniciarlo tras el rotado:
  postrotate
    /bin/kill -HUP `cat /var/run/syslogd.pid 2> /dev/null` 2> /dev/null || true
  endscript

# Permisos y usuarios
create 640 root root
  el nuevo fichero creado tras rotar tendrá esos permisos

Si tenemos definido un ACL en el fichero original se matendrá (podríamos pensar que al generar el nuevo fichero de log vacío se perderían estos atributos)

# Clusters con directorios compartidos
Activar sharedscripts y poner una condición en el de pre para ver si el nodo es el cluster activo



# A mano
logrotate -d /etc/logrotate.conf
  con -d no hace nada, solo informa.

CUIDADO!
Si ponemos un fichero de logrotate.d directamente, no estaremos pillando los default de /etc/logrotate.conf

Lo mejor es hacer un cat >> de /etc/logrotate.conf y del logrotate.d que nos interese a otro fichero y ejecutar
logrotate --state=/tmp/prueba.logrotate -v nuevo_fichero

Para rotar pero sin tocar el fichero de estado del sistema (que por defecto es /var/lib/logrotate/logrotate.status):
logrotate --state=status.logrotate -v prueba.conf

prueba.conf:
/tmp/prueba-ans/dir/nova.log {
   notifempty
   size 1k
   rotate 3
}


# Rotado por tamaño con cron cada hora

/etc/cron.d/postgres
25 * * * * root /usr/sbin/logrotate --state=/var/lib/logrotate/postgres.status /etc/logrotate.d/postgres

El formato de rotado genera nombres tipo:
postgresql.csv-2020-03-05-17.gz
Metemos la hora para poder rotar varias veces el mismo día.

/var/log/postgresql/postgresql.csv {
  rotate 14
  daily
  compress
  maxsize 20M
  nodelaycompress
  create 0600 postgres postgres
  dateext
  dateformat -%Y-%m-%d-%H
  postrotate
    sudo -u postgres /usr/pgsql-12/bin/pg_ctl logrotate -D /var/lib/pgsql/12/data
  endscript
}


# Errores
logrotate: ALERT exited abnormally with [1]
Ejecutar a mano.
Puede ser por tener dos definiciones que atacan a los mismos ficheros

Mirar el /var/spool/mail/root


Si el fichero de status esta corrompido puede ser por un bug de logrotate https://bugzilla.redhat.com/show_bug.cgi?id=625034
Actualizar la version




error: dracut.log:1 duplicate log entry for /var/log/dracut.log
error: found error in /var/log/dracut.log , skipping

Esto es porque hay dos ficheros con políticas para rotar /var/log/dracut.log



# Rotar ficheros en un cluster activo pasivo
Para comprobar que estamos en la maquina activa:

prerotate
    killall -0 snmptt

Este comando devolverá 0 si el proceso está corriendo.
Si no está corriendo devolverá 1 y no se seguirá ejecutando el logrotate.
