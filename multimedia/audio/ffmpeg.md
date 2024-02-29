https://www.phoronix.com/news/FFmpeg-CLI-MT-Merged
FFmpeg Lands CLI Multi-Threading en version 7.0

https://linuxconfig.org/ffmpeg-audio-format-conversions
-> wav
ffmpeg -i audio.aac audio.wav

https://trac.ffmpeg.org/wiki/Encode/AAC
-> mp4
ffmpeg -i input.wav -c:a libfdk_aac -b:a 128k output.m4a

https://trac.ffmpeg.org/wiki/Encode/MP3
-> mp3
ffmpeg -i input.wav -codec:a libmp3lame -qscale:a 2 output.mp3

http://superuser.com/questions/516806/how-to-encode-audio-with-opus-codec
-> opus
ffmpeg -i input.wav -acodec libopus output.opus

FLAC es lossless (no pierde calidad)
mp3 -> flac
ffmpeg -i input.mp3 output.flac

Si queremos convertir de stereo a mono
ffmpeg -i xxx.mp3 -ac 1 out.format




# Grabar en FLAC
ffmpeg -f alsa -ac 2 -ar 44100 -i pulse OUTPUT.flac

Para terminar pulsar 'q'
