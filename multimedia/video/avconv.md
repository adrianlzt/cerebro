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

Rotar video:
avconv -i video.mp4 -vf transpose=1 out.mkv
  90 grados

avconv -i video.mp4 -vf transpose=1,transpose=1 out.mkv
  180 grados (dos veces 90)

Convertir a mkv (H.264)
https://trac.ffmpeg.org/wiki/Encode/H.264
ffmpeg -i drop.avi -c:v libx264 -preset slow -crf 22 -c:a copy output.mkv

Convertir a webm
https://trac.ffmpeg.org/wiki/Encode/VP8
/usr/local/bin/ffmpeg -i drop.avi -c:v libvpx -b:v 1M -c:a libvorbis output.webm

Convertir a ogg
/usr/local/bin/ffmpeg -i drop.avi -acodec libvorbis -ac 1 -b 768k output.ogg

Convertir a ogv (libtheora)
https://trac.ffmpeg.org/wiki/TheoraVorbisEncodingGuide
ffmpeg -i drop.avi -codec:v libtheora -qscale:v 7 -codec:a libvorbis -qscale:a 5 output.ogvavi -codec:v libtheora -qscale:v 7 -codec:a libvorbis -qscale



# Calidad
http://askubuntu.com/questions/269429/how-can-i-rotate-video-by-180-degrees-with-avconv
avconv -i original.mp4 -vf "hflip,vflip" -codec:v libx264 -preset slow -crf 20 -codec:a copy flipped.mp4
Notice the -crf option. That sets the output quality. It goes from 0 (lossless) upwards logarithmically. You'll probably want a value between 19 and 25 in most cases. -preset sets the speed of the encoding, either "slow", "medium", or "fast". Slow should get you smaller file sizes with an obvious tradeoff. You should adjust -codec:v to match the original. If you don't set these options you'll get the defaults, which don't work well when flipping iphone video.

