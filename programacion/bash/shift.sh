#!/bin/bash
 
while [ $# -ne 0 ]
  do
    echo "Current Parameter: $1 , Remaining $#"
    #Pass $1 to some bash function or do whatever
    shift
done
