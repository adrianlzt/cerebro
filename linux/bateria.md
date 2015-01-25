sudo apt-get install acpi
watch --interval=5 acpi -V

/sys/class/power_supply/BAT0
Porcentaje de carga
cd /sys/class/power_supply/BAT0
echo "$(cat charge_now) / $(cat charge_full)" | bc -l
