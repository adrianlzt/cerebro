#!/bin/bash
# ./generar_nrpe.sh cpu load

for s in $*; do
  cat <<END
command[$s]=/usr/lib64/nagios/plugins/
END
done
