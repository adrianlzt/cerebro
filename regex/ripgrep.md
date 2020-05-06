http://blog.burntsushi.net/ripgrep/

un grep más rápido

Probando en un dir con mezcla de directorios, ficheros binarios y de texto. No me hace recursion

rg busqueda


rg -uu es como grep -r
rg -uuu es como grep -r -a
-u es "unrestricted". Lo que hace es reducir el "smart" searching buscando más "a saco"

rg -L
  sigue enlaces simbólicos


rg -w git -g '*py'
  buscar "git", como palabra entera, solo en los ficheros py

rg -g '!vendor' dbus
  buscar "dbus" excepto en el dir vendor
