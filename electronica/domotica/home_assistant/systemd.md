https://home-assistant.io/getting-started/autostart-systemd/


/etc/systemd/system/home-assistant.service
[Unit]
Description=Home Assistant
After=network.target

[Service]
Type=simple
User=homeassistant
#make sure the virtualenv python binary is used
Environment=VIRTUAL_ENV="/srv/homeassistant/homeassistant_venv"
Environment=PATH="$VIRTUAL_ENV/bin:$PATH"
ExecStart=/srv/homeassistant/homeassistant_venv/bin/hass -c "/home/homeassistant/.homeassistant"

[Install]
WantedBy=multi-user.target
