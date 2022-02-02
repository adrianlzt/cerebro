systemctl stop hass
sudo -u homeassistant bash
source /srv/homeassistant/bin/activate
pip3 install --upgrade homeassistant
systemctl start hass
