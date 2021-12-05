https://home-assistant.io/

Programa en python para tener una web de control domótico

# Install

## Arch
pacman -Ss home-assistant
Tras arrancarlo dio bastantes errores, lo reinicié y entonces ya levantó la UI.

http://localhost:8123/config/integrations
  no usar 127.0.0.1, problemas CORS

Para instalar la última tuve que modificar el PKGBUILD y cambiar la versión y el commit a la última.
También tuve que instalar a mano pyyaml==6.0 en el sistema

## Pip
pip3 install homeassistant

## Docker
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable


# Run
hass --open-ui
  creara la conf si no existe (~/.homeassistant/)
  levantara el puerto 8123 (no ipv6 por ahora)

# Conf
- Configuring Home Assistant:
  https://home-assistant.io/getting-started/configuration/

- Available components:
  https://home-assistant.io/components/

- Troubleshooting your configuration:
  https://home-assistant.io/getting-started/troubleshooting-configuration/

- Getting help:
  https://home-assistant.io/help/


Recargar conf:
Ir al "Developer services" (el mandito)
Elegir. Domain: homeassistant. Service: reload_core_config -> Call Service
Aunque suelo darle a restart, porque si no no veo que se apliquen los cambios.

## Iconos
Cuando nos pide poner un icono son los disponibles aqui:
https://materialdesignicons.com/
Se ponene como mdi:xxx


## SSL
https://home-assistant.io/blog/2015/12/13/setup-encryption-using-lets-encrypt/

Ahora habrá que acceder via https


# Componentes
https://home-assistant.io/components/

IFTTT, Dark Sky (tiempo), Owntracks (tracker), pushbullet


## Tracker

### Nmap
https://home-assistant.io/components/device_tracker.nmap_tracker/

Rastrea la red en busca de dispositivos para saber quien está en casa (conectado a la wifi)

Me falla


## Media player

### vlc
https://home-assistant.io/components/media_player.vlc/
https://github.com/home-assistant/home-assistant/blob/469472914b029b3392fc22cf3e8edebe42d6342a/homeassistant/components/media_player/vlc.py

apt install vlc-nox
  es vlc sin necesidad de las dependencias de X

Arrancar, antes de encender HA, con:
cvlc

El TTS funciona, pero no parece que tenga funcionalidad de playlist.

### cmus
vi ~/.config/cmus/rc
set output_plugin=pulse

Arrancar con:
cmus --listen /run/user/1000/cmus-socket

Debe estar arrancado antes de arrancar HA
Si lo paro no vuelve a conectar

No funciona con TTS

https://github.com/home-assistant/home-assistant.github.io/commit/99e502ea3115b4be380a1e282862357ab600a2da


## tts
https://home-assistant.io/components/tts/

## google calendar
https://home-assistant.io/components/calendar.google/
Necesitamos conseguir unas credenciales, como explica la web.
Luego reiniciamos homeassistant (instalará unos modulos de python nuevos)
En las trazas veremos que pone que vayamos a una url de google y metamos un código (para habilitar a homeassistant acceso a nuestro google calendar)
Al entrar en el "Home" de HA veremos una nueva tarjeta con los calendarios.
Se habrá creado el fichero google_calendars.yaml con los calendarios.

## notificaciones push con chrome
Tendremos que crear un nuevo proyecto en google cloud, verificar el dominio (subir un fichero .html a nuestro dominio y que sea accesible via https)
Meteremos la "Clave de servidor" y "ID del remitente" en la conf de HA:
notify:
  - name: chrome_push
    platform: html5
    gcm_api_key: ''
    gcm_sender_id: ''

Instalaremos en el server:
apt install libffi-dev libpython-dev libssl-dev
pip install pywebpush

Reiniciar HA. Entrar en la web y mover el slider de push notifications. Chrome nos preguntará si aceptamos.
Tras esto, ir al fichero html5_push_registrations.conf y dar un nombre al dispositivo que acabamos de registrar.

Podemos probarlo desde el "Call service"

# Android
https://home-assistant.io/getting-started/android/

Para añadirlo como "app". Ir a la web con el chrome y nos saltará un cartelito para añadirla a la home screen

