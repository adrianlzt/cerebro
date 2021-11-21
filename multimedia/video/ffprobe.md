ffprobe
extraer info de un video


Obtener fecha de creación (fecha de inicio del vídeo más duración):
$ ffprobe -v quiet -select_streams v:0  -show_entries stream_tags=creation_time -of default=noprint_wrappers=1:nokey=1 input.mp4

Duración del vídeo
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ../VID_20211120_111029_adri_primera_via.mp4

Tamaño del video:
ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 input.mp4

