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

Generar un video grabando de la webcam:

```bash
ffmpeg -f v4l2 -i /dev/video0 -c:v libx264 output2.mp4
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

<https://www.linuxfordevices.com/tutorials/linux/fake-webcam-streams>

```bash
sudo modprobe v4l2loopback card_label="My Webcam" exclusive_caps=1

v4l2-ctl --list-devices

# desmontar modulo
sudo modprobe -r v4l2loopback
```

Podemos comprobar si estamos haciendo streaming con:

```bash
ffplay /dev/video2
```

Si en el navegador no funciona, mirar la consola.
Mirar que hayamos puesto un label al cargar el v4l2loopback.
En firefox se quejaba de que la webcam tenía unas dimensiones no válidas (creo que era cosa de jitsi):

```
2025-01-07T09:28:40.727Z [modules/RTC/RTCUtils.js] <325/_getUserMedia/</<>:  Failed to get access to local media. OverconstrainedError: Constraints could be not satisfied. {"video":{"height":{"ideal":720,"max":720,"min":180},"width":{"ideal":1280,"max":1280,"min":320},"frameRate":{"min":15,"max":30},"deviceId":{"exact":"EEqkssl7+hX7W4Hy84sA6t8IPoViYCopIZIodn6XK9E="}},"audio":false}
```

Con este comando:

```bash
ffmpeg -stream_loop -1 -re -i Professional_Mode_16x9_Three_friends__two_men_with_shor.mp4 -f v4l2 /dev/video2
```

```bash
$ ffprobe Professional_Mode_16x9_Three_friends__two_men_with_shor
...
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from 'Professional_Mode_16x9_Three_friends__two_men_with_shor.mp4':
  Metadata:
    major_brand     : isom
    minor_version   : 512
    compatible_brands: isomiso2avc1mp41
    encoder         : Lavf60.3.100
  Duration: 00:00:05.10, start: 0.000000, bitrate: 3057 kb/s
  Stream #0:0[0x1](und): Video: h264 (Main) (avc1 / 0x31637661), yuv420p(progressive), 1920x1080 [SAR 1:1 DAR 16:9], 3054 kb/s, 30 fps, 30 tbr, 15360 tbn (default)
      Metadata:
        handler_name    : VideoHandler
        vendor_id       : [0][0][0][0]
        encoder         : Lavc60.3.100 h264_nvenc
```

Usando <https://webrtc.github.io/samples/src/content/getusermedia/gum/>
Para poder elegir la webcam: <https://webrtc.github.io/samples/src/content/devices/input-output/>
Consigo ver el vídeo.
También funciona con google meet.

Parece que la clave está en la codificación del vídeo, que debe ser yuv420p.

Para grabar un vídeo de la webcam con ese formato:

```bash
ffmpeg -f v4l2 -i /dev/video0 -pix_fmt yuv420p grabacion_webcam_yuv420p.mp4
```

Luego podemos simular la webcam con:

```bash
ffmpeg -stream_loop -1 -re -i grabacion_webcam_yuv420p.mp4 -f v4l2 /dev/video2
```
