# Ejemplo de script (este script parece que no funciona muy bien, pudiendo dejar de devolver ciertos valores):

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
