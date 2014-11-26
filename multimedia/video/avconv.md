Sustituto de ffmpeg

Convertir imagenes png en video
http://stackoverflow.com/questions/16315192/avconv-make-a-video-from-a-subset-on-images
avconv -r 10 -i filename_%d.png -b:v 1000k test.mp4

Slow motion, poner 10 veces más lento:
ffmpeg -i VID_20141118_120341391.mp4 -vf setpts=10*PTS camaralenta.mp4
Se tiro horas para 15MB y lo termine matando

Convertir video a imágenes
ffmpeg -i sinnombre.mp4 -r 15 -f image2 image-%3d.jpeg
  -r 15, sacar 15 fotogramas cada segundo

Reverse video:
https://raw.githubusercontent.com/gsiou/video-reverse-script/master/reverse.sh
reverse.sh (local)

Reducir tamaño
avconv -i input.mp4 -s 640x480 output.mp4
