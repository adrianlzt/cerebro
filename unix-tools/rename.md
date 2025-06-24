<http://linux.icydog.net/rename.php>
man rename

Hay dos renames, uno de utils-linux y otro de perl.
El de perl puede venir como prename o perl-rename

```bash
rename -vn '_26_06_2025_v2' '' Scenarios*
```

Con `-vn` nos dice que va a hacer sin realizar los cambios.
En ese caso quitamos esa cadena de los nombres de los ficheros que empiecen por `Scenarios`.

# utils-linux

Quitar el sufijo ".off" a los ficheros que lo tengan:
rename '.off' '' *.off

# Perl

For example, to rename all files matching "*.bak" to strip the extension, you might say
  rename 's/\.bak$//'*.bak

To translate uppercase names to lower, you'd use
  rename 'y/A-Z/a-z/' *

Cambiar todos los ficheros y directorios a lowercase:
find . -depth -exec perl-rename 'y/A-Z/a-z/' {} \;
  -depth es para que el rename del directorio se haga al final
