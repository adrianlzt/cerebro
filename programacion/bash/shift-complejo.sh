#!/bin/bash

# This script can clean up files that were last accessed over 365 days ago.

USAGE="Usage: $0 dir1 dir2 dir3 ... dirN"

if [ "$#" == "0" ]; then
	echo "$USAGE"
	exit 1
fi

while (( "$#" )); do

if [[ $(ls "$1") == "" ]]; then 
	echo "Empty directory, nothing to be done."
  else 
	find "$1" -type f -a -atime +365 -exec rm -i {} \;
fi

shift

done
