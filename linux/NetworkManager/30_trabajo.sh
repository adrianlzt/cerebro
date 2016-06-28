#! /bin/sh
#
# 30_trabajo.sh
# Conociendo la red WiFi que estamos usando, dar prioridad a un 
# tipo de conexion para el cable u a otro
#
# Copyright (C) 2016 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.
#

interface=$1
status=$2

echo "Lanzando: /etc/NetworkManager/dispatcher.d/30_trabajo.sh $interface $status"

function horario_de_trabajo() {
  local mes=$(date +%-m)
  local dia=$(date +%-d)
  local hora=$(date +%-H)

  if [[ $mes -le 5 || $mes -ge 10 || ( $mes -eq 6 && $dia -le 14 ) || ($mes -eq 9 && $dia -ge 15) ]]; then
    # jornada de invierno

    if [[ $hora -ge 7 && $hora -le 19 ]]; then
      # horario de trabajo en jornada de invierno
      return 0 # true
    fi
  else
    # jornada de verano

    if [[ $hora -ge 7 && $hora -le 15 ]]; then
      # horario de trabajo en jornada de verano
      return 0 # true
    fi
  fi

  return 1
}

if [[ $interface == "wlo1" && $status == "up" ]]; then
  case $CONNECTION_ID in
    grenoble)
      echo "Conectado a $CONNECTION_ID, dando prioridad al DHCP"

      # El cable por DHCP
      nmcli con modify TID connection.autoconnect-priority 0
      nmcli con modify DHCP connection.autoconnect-priority 10
      
      if horario_de_trabajo; then
        echo "Trabajando en casa, arrancando VPN TID y dSN"
        systemctl start vpn-tid
        systemctl start vpn-dsn-tools2
        su - adrian -c 'export DISPLAY=:0;skype'
        #su - adrian -c 'export DISPLAY=:0;/usr/bin/slack'
      fi
      ;;
    IntranetTelefonicaWiFi)
      echo "Conectado a $CONNECTION_ID, dando prioridad a TID"

      # El cable configurado con la auth de TID
      nmcli con modify DHCP connection.autoconnect-priority 0
      nmcli con modify TID connection.autoconnect-priority 10

      echo "En el trabajo, arrancando VPN dSN"
      systemctl start vpn-dsn-tools2
      su - adrian -c 'export DISPLAY=:0;skype'
      #su - adrian -c 'export DISPLAY=:0;/usr/bin/slack'
      ;;
    * )
      echo "Conectado a $CONNECTION_ID, desconocida, dando prioridad al DHCP"

      nmcli con modify TID connection.autoconnect-priority 0
      nmcli con modify DHCP connection.autoconnect-priority 10
      ;;
  esac
fi
