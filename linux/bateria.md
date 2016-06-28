sudo apt-get install acpi
watch --interval=5 acpi -V


cat /sys/class/power_supply/BAT1/capacity


# Alertar si baja la bateria
* * * * * [[ $(cat /sys/class/power_supply/BAT1/status) == "Discharging" ]] && [[ $(cat /sys/class/power_supply/BAT1/capacity) -lt 20 ]] && curl -H 'Content-Type: application/json' -H 'Access-Token: XXXXXXX' https://api.pushbullet.com/v2/pushes -d '{"title":"Bateria descargada","body":"conectar cargador","type":"note"}'


while true; do
[[ $(cat /sys/class/power_supply/BAT1/capacity) -lt $ALERTA ]] && echo "alerta"
sleep 10
done


# Antiguo
/sys/class/power_supply/BAT0
Porcentaje de carga
cd /sys/class/power_supply/BAT0
echo "$(cat /sys/class/power_supply/BAT0/charge_now) / $(cat /sys/class/power_supply/BAT0/charge_full)" | bc -l
