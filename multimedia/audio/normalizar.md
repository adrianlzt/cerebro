http://www.guia-ubuntu.com/index.php?title=Normalizar_el_volumen_de_ficheros_MP3

pacman -S mp3gain

find . -type f -iname '*.mp3' -print0 | xargs -0 mp3gain -r -k
