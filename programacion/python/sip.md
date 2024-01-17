https://pyvoip.readthedocs.io/en/latest/

Si queremos reproducir ficheros de audio tiene que ser .wav de 16 bits:
https://stackoverflow.com/questions/60352850/wave-error-unknown-format-3-arises-when-trying-to-convert-a-wav-file-into-text

Convertir con ffmpeg a 16 bits:

ffmpeg -i hello.wav -acodec pcm_s16le -ac 1 -ar 16000 hello-16b.wav

Aquí dicen que debe ser 8bit, 8k, mono/1
https://stackoverflow.com/questions/76550246/pyvoip-write-audio-send-really-bad-quality-sound

No consigo enviar audio.
https://github.com/tayler6000/pyVoIP/issues/149
