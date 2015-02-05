sudo apt-get install acpi
watch --interval=5 acpi -V

/sys/class/power_supply/BAT0
Porcentaje de carga
cd /sys/class/power_supply/BAT0
echo "$(cat /sys/class/power_supply/BAT0/charge_now) / $(cat /sys/class/power_supply/BAT0/charge_full)" | bc -l
