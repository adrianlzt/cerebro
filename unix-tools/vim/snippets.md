https://github.com/SirVer/ultisnips

Con el tab, debe aparecer en la lista al final "[US]" si tenemos un snippet.
Si tenemos varios en la lista, nos movemos con el cursor, seleccionamos con intro y damos a Control+s para expandir.
Si solo tenemos uno C-s es suficiente para expandir

Para ver los snippets:
:Snippets
  necesitamos tener https://github.com/junegunn/fzf.vim
C-x nos muetra los snippets que tenemos disponibles (ejecutado en insert mode)
:call UltiSnips#ListSnippets()
  lo mismo en no insert mode

Una vez expandido un snipppet, si tiene para rellenar, podemos usar C-j (siguiente) o C-k (anterior), para navegar por los distintos campos a rellenar.

Se detecta el tipo de fichero que estamos editando y solo nos muestra los snippets para ese tipo (mas los que estén en "all")

:UltiSnipsEdit
:UltiSnipsEdit python
edita un fichero de snippets local

:UltiSnipsEdit!
:UltiSnipsEdit! python
Edita uno de los ficheros que ya tiene snipptes.
Si tenemos cargados varios nos da a elegir

Segun editamos los ficheros de snippets, ya estarán disponibles para ser usados.

Añadir una nueva extensión al fichero cargado:
:UltiSnipsAddFiletypes python

Listado de snippets:
https://github.com/honza/vim-snippets

Si instalamos un nuevo plugin, este puede meter snippets si tiene un directorio "UltiSnips" con ficheros tipo "EXT.snippets"



Otra opcion:
https://github.com/Shougo/neosnippet.vim
https://github.com/Shougo/neocomplete.vim


