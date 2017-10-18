#! /bin/sh
#
# xrandr-increase.sh
# Copyright (C) 2017 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.
#

if [[ $1 -eq "-h" || $1 -eq "--help" ]]; then
  echo -e "Usage: xrandr-increase.sh N\n  Increase by N% your resolution virtually\n  If not defined, N=10"
  exit 1
fi

SCALE_PCT=${1:-"10"}
SCALE=$(awk "BEGIN {printf \"%.2f\",1+(${SCALE_PCT}/100)}")

FIRST_ACTIVE_MONITOR=$(xrandr --listactivemonitors | grep "^ 0:" | awk '{print $4;}')
PREFERRED_RES=$(xrandr --dryrun --output ${FIRST_ACTIVE_MONITOR} --preferred | awk '{print $3;}')

WIDTH=$(echo ${PREFERRED_RES} | cut -d 'x' -f 1)
HEIGHT=$(echo ${PREFERRED_RES} | cut -d 'x' -f 2)

NEW_WIDTH=$(awk "BEGIN {printf \"%.0f\",${SCALE}*${WIDTH}}")
NEW_HEIGHT=$(awk "BEGIN {printf \"%.0f\",${SCALE}*${HEIGHT}}")

xrandr --output ${FIRST_ACTIVE_MONITOR} --transform ${SCALE},0,0,0,${SCALE},0,0,0,1 --panning ${NEW_WIDTH}x${NEW_HEIGHT}
