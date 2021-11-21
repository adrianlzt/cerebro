# Grabar subtítulos
https://trac.ffmpeg.org/wiki/HowToBurnSubtitlesIntoVideo

Podemos grabar a fuego unos subtitulos con ffmpeg en un vídeo:
ffmpeg -i via1_144627.mp4 -vf subtitles=via1_14.46.00.srt out.mp4

Colocarlos:
https://stackoverflow.com/questions/57869367/ffmpeg-subtitles-alignment-and-position
subtitles=subtitles.srt:force_style='Alignment=9'


# Formato srt
https://docs.fileformat.com/video/srt/

Permite poner diferentes colores, bold, italic, etc

Italic	<i>...</i> or {i}...{/i}
Underline	<u>...</u> or {u}...{/u}
Font Color	<font color="white">…</font>


