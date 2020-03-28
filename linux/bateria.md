xfce4-power-manager
para actuar ante eventos de bateria
Configuración:
xfce4-power-manager --customize


sudo apt-get install acpi
watch --interval=5 acpi -V

sudo tlp-stat -b
  Datos sobre la bateria, carga máxima y actual, porcentaje, capacidad.


cat /sys/class/power_supply/BAT1/capacity


# Alertar si baja la bateria
* * * * * [[ $(cat /sys/class/power_supply/BAT1/status) == "Discharging" ]] && [[ $(cat /sys/class/power_supply/BAT1/capacity) -lt 20 ]] && curl -H 'Content-Type: application/json' -H 'Access-Token: XXXXXXX' https://api.pushbullet.com/v2/pushes -d '{"title":"Bateria descargada","body":"conectar cargador","type":"note"}'


while true; do
[[ $(cat /sys/class/power_supply/BAT1/capacity) -lt $ALERTA ]] && echo "alerta"
sleep 10
done


## Antiguo, comprobar estado bateria
/sys/class/power_supply/BAT0
Porcentaje de carga
cd /sys/class/power_supply/BAT0
echo "$(cat /sys/class/power_supply/BAT0/charge_now) / $(cat /sys/class/power_supply/BAT0/charge_full)" | bc -l



# Performance / benchmark
https://blog.fishsoup.net/2015/01/15/gnome-battery-bench/

El típico programa es powertop.
Nos dice el tiempo usado por cada programa y el número de eventos/s que se están generando, así podemos cerrar lo que más consuma.
Teóricamente nos dice el consumo y lo que queda de tiempo útil, aunque cuando lo arranqúe no cuadraba (reportaba 44h de vida).
También nos muestra ciertos tunables que podemos cambiar para reducir el consumo y el estado de los wakeOn


gnome-battery-bench
https://gitlab.gnome.org/GNOME/gnome-battery-bench
Para arrancarlo:
sudo -s
eval `dbus-launch --auto-syntax`
gnome-battery-bench


# TLP
Programa para definir unas características agresivas de ahorro de batería

tlp-stat
mostrar info de distintas configuraciones y estado respecto al sistema
