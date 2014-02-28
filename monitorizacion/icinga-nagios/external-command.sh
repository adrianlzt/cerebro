#!/bin/sh
# Adjust variables to fit your environment as necessary.
# List: http://docs.icinga.org/latest/en/extcommands2.html

now=`date +%s`
commandfile='/srv/nagios/icinga/spool/cmd/icinga.cmd'

/usr/bin/printf "[%lu] SCHEDULE_SVC_CHECK;HOSTNAME;Check load by NRPE;$now\n" $now > $commandfile
