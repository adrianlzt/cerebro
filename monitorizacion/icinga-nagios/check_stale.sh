#!/bin/bash

EXPECTED_ARGS=8
if [ $# -ne $EXPECTED_ARGS ]
then
  echo "Usage: `basename $0` -h HOST -p PORT -c CRIT_THRESHOLD -w WARN_THRESHOLD"
  exit $E_BADARGS
fi

HOST=$2
PORT=$4
CRIT=$6
WARN=$8

TOTAL_SVC=$(echo -e "GET services\nStats: state = 0" | nc $HOST $PORT)
STALED_SVC=$(echo -e "GET services\nStats: state = 0\nFilter: service_staleness >= 1.5" | nc $HOST $PORT)
/usr/lib64/nagios/plugins/check_generic.pl -e "echo \"$STALED_SVC*100/$TOTAL_SVC\" | bc -l" -w ">$WARN" -c ">$CRIT" -p pct_staled
