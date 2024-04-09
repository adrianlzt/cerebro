Formato que puede contener video, audio, subtitulos y metadatos. Es un contenedor de medios basado en Matroska.

# MKV Toolnix
https://mkvtoolnix.download/
mkvtoolnix-cli
mkvinfo file.mkv

Para sacar la información en formato json
mkvmerge --identify --identification-format json file.mkv

Extraer pista de subtítulos (el número de la pista se obtiene con mkvinfo):
mkvextract tracks vsshort-vorbis-subs.mkv 2:subs.txt


Cortar un video .mkv
mkvmerge -o output1.mkv --split timecodes:00:01:00 input.mkv

Genera dos ficheros, uno hasta el minuto 1 y otro desde el minuto 1.
output1-001.mkv
output1-002.mkv

Esto genera dos ficheros, uno hasta el segundo 10 y otro desde el minuto 1.
mkvmerge -o out.mkv --split parts:-00:00:10,00:01:00- vsshort-vorbis-subs.mkv


Para unir ficheros:
mkvmerge -o final_output.mkv output1.mkv + output3.mkv


# Mkvdump
Herramienta para extraer los metadatos:
https://github.com/cadubentzen/mkvdump
