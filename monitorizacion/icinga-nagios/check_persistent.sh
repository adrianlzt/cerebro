#!/bin/bash
#
# https://gist.github.com/adrianlzt/1513c72b461bfc8ffccb
#
# If state is not OK, it will remain in this state until is setted manually to OK by an external command.
#
# Example nagios command definition:
#
# define command {
#         command_line                   $USER1$/check_persistent.sh $SERVICESTATEID$ "$SERVICEOUTPUT$" $USER1$/check_nrpe -H $HOSTADDRESS$ -c $ARG1$
#         command_name                   check_persistent_nrpe
# }
#


#echo "`date` $* " >> /tmp/check_persistent.txt

SERVICESTATEID=$1
shift

SERVICEOUTPUT=$1
shift

if [[ $SERVICESTATEID == 0 ]]; then
    $*
else 
    if [[ $(echo $SERVICEOUTPUT | grep ^PERSISTENT) ]]; then
        echo $SERVICEOUTPUT
    else
        echo "PERSISTENT: $SERVICEOUTPUT"
    fi
    exit $SERVICESTATEID
fi
