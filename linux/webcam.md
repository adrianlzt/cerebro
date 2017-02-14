# guvcview
pacman -S guvcview


## Uso
Interfaz gráfica
guvcview

-d /dev/video1
  para seleccionar otra webcam

Me da problemas al capturar sin el entorno grafico


# fswebcamn
sudo pacman -S fswebcam

fswebcam web-cam-shot.jpg
-d /dev/video1
  para seleccionar otra webcam



# Streaming con VLC
http://xmodulo.com/live-stream-video-webcam-linux.html

Medio -> Emitir -> Dispositivo de Captura -> /dev/video0

Elegir medio de emision HTTP

Una vez emitiendo podemos verlo con ffmpeg:
ffplay http://127.0.0.1:8081/video


Con RTSP
ffplay rtsp://127.0.0.1:8554/video
