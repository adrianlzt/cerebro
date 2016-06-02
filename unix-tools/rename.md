http://linux.icydog.net/rename.php
man rename

Hay dos renames, uno de utils-linux y otro de perl.
El de perl puede venir como prename o perl-rename

For example, to rename all files matching "*.bak" to strip the extension, you might say
  rename 's/\.bak$//' *.bak

To translate uppercase names to lower, you'd use
  rename 'y/A-Z/a-z/' *

Cambiar todos los ficheros y directorios a lowercase:
find . -depth -exec perl-rename 'y/A-Z/a-z/' {} \;
  -depth es para que el rename del directorio se haga al final
