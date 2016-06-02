sudo apt-get install acpi
watch --interval=5 acpi -V


cat /sys/class/power_supply/BAT1/capacity


# Alertar si baja la bateria
while true; do
[[ $(cat /sys/class/power_supply/BAT1/capacity) -lt $ALERTA ]] && echo "alerta"
sleep 10
done


# Antiguo
/sys/class/power_supply/BAT0
Porcentaje de carga
cd /sys/class/power_supply/BAT0
echo "$(cat /sys/class/power_supply/BAT0/charge_now) / $(cat /sys/class/power_supply/BAT0/charge_full)" | bc -l
