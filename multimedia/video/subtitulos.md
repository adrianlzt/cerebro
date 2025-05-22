# Grabar subtítulos
<https://trac.ffmpeg.org/wiki/HowToBurnSubtitlesIntoVideo>

Podemos grabar a fuego unos subtitulos con ffmpeg en un vídeo:
ffmpeg -i via1_144627.mp4 -vf subtitles=via1_14.46.00.srt out.mp4

Colocarlos:
<https://stackoverflow.com/questions/57869367/ffmpeg-subtitles-alignment-and-position>
subtitles=subtitles.srt:force_style='Alignment=9'

# Formato srt
<https://docs.fileformat.com/video/srt/>

Permite poner diferentes colores, bold, italic, etc

Italic <i>...</i> or {i}...{/i}
Underline <u>...</u> or {u}...{/u}
Font Color <font color="white">…</font>

# Buscar subtítulos

En <https://www.opensubtitles.org/> podemos buscar usando el hash del fichero de vídeo.
Puedes arrastrar el fichero sobre la barra de búsqueda de la web, hará el cálculo del hash en local y lo buscará.

En VLC hay una extensión, VLSub, que lo hace automáticamente (Mayo 2025, no me ha funcionado configurando un usuario, no he mirado más).
