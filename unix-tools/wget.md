Descargar una web con todos los ficheros, pero sin subir en el path:
wget -r -k -p -np http://wikis.inet/index.php/SISTEMAS
	-r recursive
	-k cambiar links para que funcione en local
	-p bajar los requisitos de la web para que se vea bien
	-np no subir por el path
