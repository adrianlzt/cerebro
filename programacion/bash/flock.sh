#!/bin/sh
#
# mirar flock.md
# Con '-w 0' sale si el lock esta ocupado
# Si lo quitamos se queda esperando hasta que se libere el lock
#

WAIT=10

lockfile="/tmp/cron_rsync.lock"
if [ -z "$flock" ] ; then
  lockopts="-w $WAIT $lockfile"
  exec env flock=1 flock $lockopts $0 "$@"
fi

# Tarea larga a ejecutar
rsync ...

