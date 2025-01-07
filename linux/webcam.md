# Info webcam

v4l2-ctl --all
v4l2-ctl --list-devices
v4l2-ctl --all -d /dev/video0

sudo lsusb
  buscar el id de la webcam y meterlo como:
sudo lsusb --verbose -d 04f2:b6b6

Con el programa "cheese" me permite seleccionar la calidad de la imagen.

# ffmpeg

Ver stream de una webcam:

```bash
ffplay /dev/video0
```

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
<http://xmodulo.com/live-stream-video-webcam-linux.html>

Medio -> Emitir -> Dispositivo de Captura -> /dev/video0

Elegir medio de emision HTTP

Una vez emitiendo podemos verlo con ffmpeg:
ffplay <http://127.0.0.1:8081/video>

Con RTSP
ffplay rtsp://127.0.0.1:8554/video

# Fake stream webcam

```bash
sudo modprobe v4l2loopback card_label="My Fake Webcam" exclusive_caps=1
# otra opción que he usado
sudo modprobe v4l2loopback devices=1

v4l2-ctl --list-devices
```

TODO
<https://www.linuxfordevices.com/tutorials/linux/fake-webcam-streams>
