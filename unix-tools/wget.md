Descargar una web con todos los ficheros, pero sin subir en el path:
wget -r -k -p -np http://wikis.inet/index.php/SISTEMAS
	-r recursive
	-k cambiar links para que funcione en local
	-p bajar los requisitos de la web para que se vea bien
	-np no subir por el path
    -nd no crear directorios


Hacer copia de un mediawiki
wget --mirror --convert-links --html-extension --no-parent --wait=5 --header "Cookie: wiki_XXXX_session=3b5b49ce721bf6770ff" https://url/mediawiki/ --no-check-certificate


wget ... -O output.fichero
