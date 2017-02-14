https://play.google.com/store/apps/details?id=com.pas.webcam&rdid=com.pas.webcam
https://home-assistant.io/components/camera.ffmpeg/

apt install ffmpeg

Para una transmision rtsp pondremos algo tipo:

camera:
  - platform: ffmpeg
    input: rtsp://192.168.1.2:8554/video


Si usamos la app de android el input será de este tipo:
http://192.168.1.44:8080/video


# Manything
App para android/iOS que graba y emite video.
Se puede confurar a través de IFTTT
