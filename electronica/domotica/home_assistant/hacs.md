https://hacs.xyz/

Home Assistant Community Store

HACS gives you a powerful UI to handle downloads of all your custom needs.


# Install

## arch / home-assistant pkg
mkdir -p /var/lib/private/hass/custom_components/hacs
cd /var/lib/private/hass/custom_components/hacs
wget "https://github.com/hacs/integration/releases/latest/download/hacs.zip"
unzip hacs.zip
rm hacs.zip
chown -R hass:hass /var/lib/private/hass/custom_components/hacs
sudo systemctl restart home-assistant

http://localhost:8123/config/integrations
  add integration -> HACS

Una vez añadido, aparecerá un nuevo botón en el menú: "HACS"

Parece que tarda en arrancar, tiene pinta de que se baja cosas de github para hacer un índice de paquetes o similar.


# Uso
Una vez instalado un componente, tendremos que restear e ir a Configuration / integrations para encontrarlo
