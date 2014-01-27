http://linux.die.net/man/8/logrotate

Cuando rotar:
size n[k|M|G] : rota cuando el tamaño del fichero sea mayor del especificado
minsize n[k|M|G] : rota cuando el tamaño del fichero es mayor del espeficado y también se cumple una orden temporal (daily, weekly, monthly)
daily
weekly: rota cuando el día de la semana es menor que el día del último rotado, o si ha pasado más de una semana desde el último rotado
monthly: rota el primer día de cada mes (si logrotate corre todos los días, si no, el primer día que se ejecute logrotate en el mes)

Cuanto rotar y como:
rotate n : mantiene n ficheros. Si ponemos 0, no mantiene ficheros antiguos.
maxage count : elimina ficheros rotados mayores que count días
notifempty: Do not rotate the log if it is empty (this overrides the ifempty option).
missingok: If the log file is missing, go on to the next one without issuing an error message. See also nomissingok.
delaycompress: mantiene el ultimo fichero rotado sin comprimir
copytruncate: copia el fichero y luego lo trunca (echo "" > fichero). Pueden perderse algunos datos que se escriban entre el copiado y el truncado. Esto es útil para algunos programas que no podemos decirles que vuelvan a abrir el fichero de log, y se mantenga escribiendo al mismo file descriptor
create mode owner group: permisos y dueños del nuevo fichero que se crea tras el rotado.
compress: comprimir archivos antiguos
sharedscripts: solo ejecutamos el prescript y/o postscript una vez (para el caso de tener varios ficheros en el mismo logrotate). No se ejecuta nada si no se rota.


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

