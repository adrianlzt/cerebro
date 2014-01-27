#!/bin/bash
 
#@
#@ ==============================================================================
#@
#@ ZEN'S BASH TEMPLATE SCRIPT
#@ bash script template for creating scripts that supports commands 
#@ 
#@ example:
#@ zenbash.sh helloworld "HELL YEAH"
#@
#@ (c) 2010 zen sugiarto / zugiart.com
#@ you can find this script + my bash notes at zugiart.com/wiki/bash 
#@ 
#@ Aqui podríamos meter el usage
#@ 
#@ ==============================================================================
#@
 
# =============================================================================================================
# HELPER METHOD
# =============================================================================================================
 
 
function log()
{		
  # modify accordingly if you want msg to go to files etc
  echo -e "\e[01;32m>`date +'%Y.%m.%d %H:%M:%S'` $LOG_VMNAME | INFO  | $1\e[00m"
}
 
function warn()
{
  echo -e "\e[01;33m>`date +'%Y.%m.%d %H:%M:%S'` $LOG_VMNAME | ERROR | $1\e[00m"
}

function error()
{
  echo -e "\e[00;31m>`date +'%Y.%m.%d %H:%M:%S'` $LOG_VMNAME | ERROR | $1\e[00m"
}
 
# =============================================================================================================
# CMD DEFINITION
# =============================================================================================================
 
#% 
#@ help 
#@  - show help for a given cmd. if not specified, shows all help cmd 
#@ 
#%  
function help() {
  cmd=$1
  if  [[ "$cmd" == "" ]]; then
    cat $0 | grep "#@" | grep -v "grep \"#@\"" | cut -d'@' -f2-1000
  else
    strcmd="sed -n '/<doc:$cmd>/,/<\/doc:$cmd>/p' $0"
    eval $strcmd | grep -v "#%" | cut -d'@' -f2-1000
  fi
}
 
#% 
#@ helloworld 
#@  - prints a hello world message with additional  
#@ 
#% 
function helloworld() {
  msg=$1
  if [[ "$msg" == "" ]]; then 
    error "param1:msg is mandatory"; 
    return 1; 
  fi

  echo "HELLO WORLD"
  echo "$msg"
}
 
#% 
#@ cmd1  
#@  - description of cmd1
#@
#% 
function cmd1()
{
  log "cmd3 is called"
}
 
 
# =============================================================================================================
# MAIN BLOCK
# =============================================================================================================

TEST=
SERVER=
PASSWD=
VERBOSE=

while getopts ":ht:r:p:v" OPTION
do
  case $OPTION in
    h)
      help
      exit 1
      ;;
    t)
      TEST=$OPTARG
      ;;
    r)
      SERVER=$OPTARG
      ;;
    p)
      PASSWD=$OPTARG
      ;;
    v)
      VERBOSE=1
      ;;

    \?)
      help
      exit 1
      ;;

    :)
      echo "Option -$OPTARG requires an argument." >&2
      help
      exit 1
      ;;

    *)
      # Should not occur
      echo "Unknown error while processing options" >&2
      ;;
  esac
done

echo "Parametros $TEST $SERVER $PASSWD $VERBOSE"

log "algo que saco por el logger"
warn "algo warn"
error "algo que saco por el error"
