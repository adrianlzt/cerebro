Mejora sobre rcp y scp. Hace transmisiones incrementales, evitando enviar los datos de los que ya dispone la otra parte.
# rsync -ahHPv --stats --numeric-ids . pepe@10.5.2.1:/rsinc/
-a, --archive               archive mode; equals -rlptgoD (no -H,-A,-X)
	-r, --recursive             recurse into directories
	-l, --links                 copy symlinks as symlinks
	-p, --perms                 preserve permissions
	-t, --times                 preserve modification times
	-g, --group                 preserve group
	-o, --owner                 preserve owner (super-user only)
	-D                          same as --devices --specials
		--devices               preserve device files (super-user only)
		--specials              preserve special files

-h, --human-readable        output numbers in a human-readable format
-H, --hard-links            preserve hard links 
-v, --verbose               increase verbosity
-P, --progress              show progress during transfer

--stats                 give some file-transfer stats
--numeric-ids           don't map uid/gid values by user/group name

Otras opciones
--exclude=PATTERN       exclude files matching PATTERN
--exclude-from=FILE     read exclude patterns from FILE
--include=PATTERN       don't exclude files matching PATTERN
--include-from=FILE     read include patterns from FILE
--files-from=FILE       read list of source-file names from FILE
	Dentro de este fichero hay que poner las rutas relativas (mirar ‘man’)


Copiar una estructura de directorios excepto los directorios backup:
rsync -av --progress --exclude backup nagiosql/  nagiosql-sin-backup
