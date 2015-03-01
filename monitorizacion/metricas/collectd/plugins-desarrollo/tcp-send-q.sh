#!/bin/bash
HOSTNAME="${COLLECTD_HOSTNAME:-localhost}"
INTERVAL="${COLLECTD_INTERVAL:-10}"

while sleep "$INTERVAL"; do
  ss -4lnt | tail -n +2 | awk '{print $2" "$4;}' | sed "s/\([0-9]*\).*:\([0-9]*\)$/PUTVAL $HOSTNAME\/tcp-send-q\/queue_length-\2 interval=$INTERVAL N:\1/"
done
