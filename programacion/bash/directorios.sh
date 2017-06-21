#!/bin/bash
echo "The script you are running has basename `basename $0`, dirname `dirname $0`"
echo "The present working directory is `pwd`"


echo "Si queremos el full path"
echo "$(dirname `realpath $0`)"

echo "con python"
MY_PATH=$(python -c 'import os,sys;print(os.path.realpath(sys.argv[1]))' $0/..)
echo ${MY_PATH}
