systemctl stop hass
sudo -u homeassistant bash
source /srv/homeassistant/bin/activate
pip3 install --upgrade homeassistant
systemctl start hass

Si cambiamos de versión de python, recordar dar capabilities al binario (si usamos ble_monitor).
setcap cap_net_admin,cap_net_raw=eip /usr/local/bin/python3.11

También:
pip3 install psycopg2-binary python-dateutil bluetooth-sensor-state-data
