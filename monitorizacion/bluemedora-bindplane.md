Agente de monitorización de GCP

config: /opt/bluemedora/bindplane-collector/config/config.json
Install Path:             /opt/bluemedora/
Log Path:                 /opt/bluemedora/bindplane-collector/log
Manual Startup Command:   systemctl start bindplane-collector
Manual Shutdown Command:  systemctl stop bindplane-collector


Para capturar logs usan fluentd
https://docs.bindplane.bluemedora.com/docs/custom-input

Log Path:                 /var/log/bindplane-log-agent/
Configuration Path:       /etc/bindplane-log-agent/
Start On Boot:            Yes
Manual Startup Command:   sudo systemctl start bindplane-log-agent && sudo systemctl start bindplane-fluentd
Manual Shutdown Command:  sudo systemctl stop bindplane-log-agent && sudo systemctl stop bindplane-fluentd
