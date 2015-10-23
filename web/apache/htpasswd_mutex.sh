#!/bin/sh
#
# htpasswd does not handle correctly simultaneously changes to a passwd file
# This wrapper uses flock to wait until lock is released before execute htpasswd
# This only works if all calls to htpasswd are done via this wrapper.
#

WAIT=10

lockfile="/tmp/htpasswd.lock"
if [ -z "$flock" ] ; then
  lockopts="-w $WAIT $lockfile"
  exec env flock=1 flock $lockopts $0 "$@"
fi

/usr/bin/htpasswd $@
