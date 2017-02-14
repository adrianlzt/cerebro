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

Google Text-to-Speech
Amazon
...
