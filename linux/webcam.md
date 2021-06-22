# guvcview
pacman -S guvcview


## Uso
Interfaz gráfica
guvcview

-d /dev/video1
  para seleccionar otra webcam

Capturar una imagen desde la cli sin X
guvcview -g none -i captura.jpg -n 1 -a none -e -t 1 -b
  la crea en $HOME/captura-N.jpg


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
