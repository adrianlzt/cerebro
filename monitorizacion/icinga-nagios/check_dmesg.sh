#!/bin/bash

# Return codes:
STATE_OK=0
STATE_WARNING=1
STATE_CRITICAL=2
STATE_UNKNOWN=3

ErrInfo=$(/bin/dmesg |/bin/grep -c "Call Trace")

if [ $ErrInfo -eq 0 ];
then
        echo "DMESG OK"
        exit ${STATE_OK}
else
        echo "DMESG CRITICAL - Call Trace messages in dmesg"
        exit ${STATE_CRITICAL}
fi
