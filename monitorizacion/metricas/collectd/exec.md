Ejemplo del fichero de configuración:

LoadPlugin exec
<Plugin exec>
  Exec "hacluster" "/usr/local/bin/exec-ping.sh" "172.31.200.10"
</Plugin>

Exec "usuario:grupo" "/path/ejecutable" "arg1" "arg2"


Ejemplo de script (este script parece que no funciona muy bien, pudiendo dejar de devolver ciertos valores):

HOSTNAME="${COLLECTD_HOSTNAME:-localhost}"
#INTERVAL="${COLLECTD_INTERVAL:-1}"
INTERVAL="1"
HOST=$1
 
while sleep "$INTERVAL"; do
  DATE=`date +%s`
  PING=`ping -c 1 -W 1 -q $HOST`
  RET=$?
  VALUE=`echo $PING | cut -d '/' -f 5`
  if [[ $RET -eq 0 ]]; then
    echo "PUTVAL \"$HOSTNAME/exec-ping-$HOST/response_time\" interval=$INTERVAL $DATE:$VALUE"
  else
    echo "PUTVAL \"$HOSTNAME/exec-ping-$HOST/response_time\" interval=$INTERVAL $DATE:10"
  fi
done

Al script se le pasan las variables de entorno COLLECTD_HOSTNAME y COLLECTD_INTERVAL (por defecto 10s)

El stdout que espera collectd es del tipo:
PUTVAL "$HOSTNAME/nombre-plugin/data_type" interval=intervalo_de_ejecucción_del_check FECHA_unix_epoch:valor

Depende del data type tendremos que pasar uno o mas valores en $VALUE.
Podría ser por ejemplo: $DATE:$VALUERX:$VALUETX
