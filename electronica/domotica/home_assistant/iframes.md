https://home-assistant.io/components/panel_iframe/

Si tenemos HomeAssistant por https, los iframes deben ser https

configuration.yaml
panel_iframe: !include_dir_named iframes

iframes/test.yaml
title: 'Grafana'
url: 'https://www.example.com/'
icon: mdi:car


Iconos de https://materialdesignicons.com/
