#! /bin/sh
#
# bateria.sh
# Copyright (C) 2016 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.
#


ALERTA_MIN=10
ALERTA_MAX=90

while true; do

  ESTADO=$(cat /sys/class/power_supply/BAT1/status)
  NIVEL=$(cat /sys/class/power_supply/BAT1/capacity)

  if [[ $ESTADO == "Charging" ]] && [[ $NIVEL -gt ${ALERTA_MAX} ]]; then
    curl -H 'Content-Type: application/json' -H 'Access-Token: o.LLDOtsP1St34nG1Z4snPsyUFSqbCYAF0' https://api.pushbullet.com/v2/pushes -d '{"title":"Bateria cargada","body":"devolver cargador","type":"note"}'
  fi


  if [[ $ESTADO == "Discharging" ]] && [[ $NIVEL -lt ${ALERTA_MIN} ]]; then
    curl -H 'Content-Type: application/json' -H 'Access-Token: o.LLDOtsP1St34nG1Z4snPsyUFSqbCYAF0' https://api.pushbullet.com/v2/pushes -d '{"title":"Bateria descargada","body":"pedir cargador","type":"note"}'
  fi

  sleep 30
done

