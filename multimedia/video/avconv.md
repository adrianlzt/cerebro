https://github.com/yuanqing/vdx
Comando que simplifica la conversión de video (usando por debajo ffmpeg)


https://trac.ffmpeg.org/wiki/Encode/AAC
-> mp4
ffmpeg -i input.wav -c:a libfdk_aac -b:a 128k output.m4a

https://trac.ffmpeg.org/wiki/Encode/MP3
-> mp3
ffmpeg -i input.wav -codec:a libmp3lame -qscale:a 2 output.mp3

http://superuser.com/questions/516806/how-to-encode-audio-with-opus-codec
-> opus
ffmpeg -i input.wav -acodec libopus output.opus


Video a h264
https://trac.ffmpeg.org/wiki/Encode/H.264
ffmpeg -i input -c:v libx264 -preset veryfast output.mkv
  veryfast tarda algo más que la duración real del video, speed=0.7%

https://write.corbpie.com/ffmpeg-preset-comparison-x264-2019-encode-speed-and-file-size/
Dependiendo del preset tendremos videos más o menos comprimidos a cambios de más o menos cpu/memoria de procesado. 


# Emitir rtp
https://trac.ffmpeg.org/wiki/StreamingGuide

For example the following command will generate a signal, and will stream it to the port 1234 on localhost:
ffmpeg -re -f lavfi -i aevalsrc="sin(400*2*PI*t)" -ar 8000 -f mulaw -f rtp rtp://127.0.0.1:1234

To play the stream with ffplay (which has some caveats, see above), run the command:
ffplay rtp://127.0.0.1:1234


# Recibir streaming
## HTTP
ffplay http://127.0.0.1:8081/video

## RTSP
ffplay rtsp://127.0.0.1:8554/video


# Rotar
ffmpeg -i input.mp4 -vf "transpose=1" output.mp4

0 – Rotate by 90 degrees counter-clockwise and flip vertically. This is the default.
1 – Rotate by 90 degrees clockwise.
2 – Rotate by 90 degrees counter-clockwise.
3 – Rotate by 90 degrees clockwise and flip vertically.




# Unir audio + video
ffmpeg -i alexandermegos_taping.mp4 -i alexandermegos_taping_audio.mp4 -c:v copy -c:a aac output.mp4



# Añadir un borde al vídeo
https://stackoverflow.com/questions/46671252/how-to-add-black-borders-to-video

Ejemplo añadiendo un borde de 640px negro solo a la derecha.
ffmpeg -i via1_144627.mp4 -filter_complex "[0]pad=w=640+iw:h=0+ih:x=0:y=0:color=black" output.mp4



# Subtítulos
Mirar multimedia/video/subtitulos.md



# Mover
Desplazar una imagen por la pantalla
https://superuser.com/questions/727379/how-to-make-left-right-transition-of-overlay-image-ffmpeg

ffmpeg -i 1.ts -i 2.ts -filter_complex "[0:v][1:v]overlay=x='if(lte(-w+(t)*100,w/2),-w+(t)*100,w/2)':y=0[out]" -map '[out]' -y out.mp4



# Extraer frames
ffmpeg -ss 05:00 -i <input> -t 05:00 filename%05d.png
