#!/bin/sh                                                                                                
# Copyright (C) 2005-2015 Splunk Inc. All Rights Reserved.                                                                      
#                                                                                                        
#   Licensed under the Apache License, Version 2.0 (the "License");                                      
#   you may not use this file except in compliance with the License.                                     
#   You may obtain a copy of the License at                                                              
#                                                                                                        
#       http://www.apache.org/licenses/LICENSE-2.0                                                       
#                                                                                                        
#   Unless required by applicable law or agreed to in writing, software                                  
#   distributed under the License is distributed on an "AS IS" BASIS,                                    
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.                             
#   See the License for the specific language governing permissions and                                  
#   limitations under the License.      

. `dirname $0`/common.sh

HEADER='Name    rxPackets_PS txPackets_PS rxKB_PS txKB_PS'
HEADERIZE="BEGIN {print \"$HEADER\"}"
PRINTF='{printf "%s    %s  %s  %s  %s\n", Name, rxPackets_PS, txPackets_PS, rxKB_PS, txKB_PS}'

# Note: For FreeBSD, bsdsar package needs to be installed. Output matches linux equivalent
if [ "x$KERNEL" = "xLinux" ] ; then
    CMD='sar -n DEV 1 2'
    FILTER='($0 !~ "Average" || $0 ~ "sar" || $2 ~ "lo|IFACE") {next}'
    FORMAT='{Name=$2; rxPackets_PS=$3; txPackets_PS=$4; rxKB_PS=$5; txKB_PS=$6}'
elif [ "x$KERNEL" = "xSunOS" ] ; then
    CMD='sar -n DEV 1 2'
    FILTER='($0 ~ "Time|sar| lo") {next}'
    FORMAT='{Name=$2; rxPackets_PS=$5; txPackets_PS=$6; rxKB_PS=$3; txKB_PS=$4}'
elif [ "x$KERNEL" = "xAIX" ] ; then
    # Sample output: http://www-01.ibm.com/support/knowledgecenter/ssw_aix_61/com.ibm.aix.performance/nestat_in.htm
    CMD='netstat -i -Z; netstat -in'
    FILTER='($0 ~ "Name|sar| lo") {next}'
    FORMAT='{Name=$1; rxPackets_PS=$5; txPackets_PS=$7; rxKB_PS=?; txKB_PS=?}'
elif [ "x$KERNEL" = "xDarwin" ] ; then
    CMD='sar -n DEV 1 2'
    FILTER='($0 !~ "Average" || $0 ~ "sar" || $2~/lo[0-9]|IFACE/) {next}'
    FORMAT='{Name=$2; rxPackets_PS=$3; txPackets_PS=$5; rxKB_PS=$4/1024; txKB_PS=$6/1024}'
elif [ "x$KERNEL" = "xHP-UX" ] ; then
    # Sample output: http://h20565.www2.hp.com/hpsc/doc/public/display?docId=emr_na-c02263324
    CMD='netstat -i 1 2'
    FILTER='($0 ~ "Name|sar| lo") {next}'
    FORMAT='{Name=$1; rxPackets_PS=$5; txPackets_PS=$7; rxKB_PS=?; txKB_PS=?}'
elif [ "x$KERNEL" = "xFreeBSD" ] ; then
    CMD='sar -n DEV 1 2'
    FILTER='($0 !~ "Average" || $0 ~ "sar" || $2 ~ "lo|IFACE") {next}'
    FORMAT='{Name=$2; rxPackets_PS=$3; txPackets_PS=$4; rxKB_PS=$5; txKB_PS=$6}'
fi

assertHaveCommand $CMD
$CMD | tee $TEE_DEST | $AWK "$HEADERIZE $FILTER $FORMAT $PRINTF"  header="$HEADER"
echo "Cmd = [$CMD];  | $AWK '$HEADERIZE $FILTER $FORMAT $PRINTF' header=\"$HEADER\"" >> $TEE_DEST
