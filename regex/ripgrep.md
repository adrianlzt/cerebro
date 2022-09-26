http://blog.burntsushi.net/ripgrep/

un grep más rápido

Probando en un dir con mezcla de directorios, ficheros binarios y de texto. No me hace recursion

rg busqueda


rg -uu es como grep -r
rg -uuu es como grep -r -a
-u es "unrestricted". Lo que hace es reducir el "smart" searching buscando más "a saco"

rg -L
  sigue enlaces simbólicos

rg -l
  solo mostrar ficheros

rg -I
  no mostrar el nombre de los ficheros donde hay match


rg -w git -g '*py'
  buscar "git", como palabra entera, solo en los ficheros py

rg -g '!vendor' dbus
  buscar "dbus" excepto en el dir vendor

--sort modified
  mostrar más abajo los ficheros más nuevos

Multilinea:
https://til.hashrocket.com/posts/9zneks2cbv-multiline-matches-with-ripgrep-rg

echo 'apple\norange\nbanana\nkiwi' | rg --multiline --multiline-dotall 'orange.*kiwi'
