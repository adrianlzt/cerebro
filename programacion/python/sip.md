# baresipy
https://github.com/OpenJarbas/baresipy

Funciona el llamar y enviar un audio.
En realidad está enviando comandos a un baresip por debajo de forma bastante simple.
Parece que sin opcion de recibir audio.


# https://github.com/andreabak/sibilant
Buena pinta, pero aún en desarrollo (enero'24)


# pyvoip
https://pyvoip.readthedocs.io/en/latest/

Si queremos reproducir ficheros de audio tiene que ser .wav de 16 bits:
https://stackoverflow.com/questions/60352850/wave-error-unknown-format-3-arises-when-trying-to-convert-a-wav-file-into-text

Convertir con ffmpeg a 16 bits:

ffmpeg -i hello.wav -acodec pcm_s16le -ac 1 -ar 16000 hello-16b.wav

Aquí dicen que debe ser 8bit, 8k, mono/1
https://stackoverflow.com/questions/76550246/pyvoip-write-audio-send-really-bad-quality-sound

Alguien quejándose de que no puede enviar audio.
Yo si he podido enviar audio usando los clientes Zoiper
https://github.com/tayler6000/pyVoIP/issues/149


# PJSUA
https://docs.pjsip.org/en/latest/pjsua2/hello_world.html#python3

Para instalarlo en Arch:
https://wiki.archlinux.org/title/Unofficial_user_repositories#alerque

Librería bastante compleja. Posiblemente valga para todo.
