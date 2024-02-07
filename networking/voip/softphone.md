Apps de softphone (para instalar en el móvil o pc para llamar o recibir llamadas):

Acrobits Softphone (6.5€, android / ios)

zoiper para linux
  quitar STUN en la config de la cuenta
  este es el que uso
  mirar que tena un tick verde arriba a la izquierda, es que estamos conectados

linphone (android, también tiene appimage para linux)
  aur/linphone-desktop-appimage
  Lo conseguí conectar a un asterisk local tras varias pruebas.
    dirección sip: sip:adri-movil@172.17.0.1
    server sip: <sip:172.17.0.1;transport=tcp>
    no publicar info presencia
    no activar ice
    En red, cambiados los puertos de SIP UDP/TCP a 5601
  Explota al colgar las llamadas (segmentation fault).
  Comprobar que asterisk no rechaza el auth por ya estar registrado
    WARNING[2048597]: res_pjsip_registrar.c:769 register_aor_core: Registration attempt from endpoint 'adri-movil' (172.17.0.1:55734) to AOR 'adri-movil' will exceed max contacts of 1

jami, no me conecta, no he mirado mucho

blink, linux windows mac: https://icanblink.com/
  el mejor que he visto para linux y opensource
  no consigo compilarlo con yay, problemas con cython


# baresip
https://github.com/baresip/baresip/wiki/Using-Baresip:-Basic-Commands

La primera vez que lo arrancamos nos creará una ~/.baresip con ficheros de config por defecto.

Para configurar una cuenta:
.baresip/accounts
Usar "localhost", no 127.0.0.1
Si usamos la ip nos dará un error de "ladrr".
Ejemplo:
<sip:movil@localhost>;auth_pass=secret;answermode=auto

En config poner nuestro módulo de audio,por ejemplo, quitar alsa y poner
module pipewire.so

/dial 100
  llamar a la extensión 100
/reginfo
  para ver el estado actual del registro en el server sip

Para reproducir un audio al llamar:
En la config:
audio_source		aufile,hello-16b.wav
module			aufile.so


El .wav generado con:
ffmpeg -i wire.wav -ac 1 -ar 8000 -acodec pcm_s16le wire2.wav


# Python
mirar python/sip.md
