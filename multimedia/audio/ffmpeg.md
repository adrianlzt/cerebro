https://trac.ffmpeg.org/wiki/Encode/AAC
-> mp4
ffmpeg -i input.wav -c:a libfdk_aac -b:a 128k output.m4a

https://trac.ffmpeg.org/wiki/Encode/MP3
-> mp3
ffmpeg -i input.wav -codec:a libmp3lame -qscale:a 2 output.mp3

http://superuser.com/questions/516806/how-to-encode-audio-with-opus-codec
-> opus
ffmpeg -i input.wav -acodec libopus output.opus



# Grabar en FLAC
ffmpeg -f alsa -ac 2 -ar 44100 -i pulse OUTPUT.flac

Para terminar pulsar 'q'
