https://github.com/SirVer/ultisnips

Con el tab, debe aparecer en la lista al final "[US]" si tenemos un snippet.
Si tenemos varios en la lista, nos movemos con el cursor, seleccionamos con intro y damos a tab para expandir.
Si solo tenemos uno tab es suficiente para expandir

Se detecta el tipo de fichero que estamos editando y solo nos muestra los snippets para ese tipo (mas los que estén en "all")

:UltiSnipsEdit
edita un fichero de snippets

:UltiSnipsEdit!
Edita uno de los ficheros que ya tiene snipptes.
Si tenemos cargados varios nos da a elegir

Otra opcion:
https://github.com/Shougo/neosnippet.vim
https://github.com/Shougo/neocomplete.vim


Listado de snippets:
https://github.com/honza/vim-snippets

Snippets cargados actualmente (hay un comando para forzar la carga de snippets de otras extensiones):
call UltiSnips#ListSnippets()

Si instalamos un nuevo plugin, este puede meter snippets si tiene un directorio "UltiSnips" con ficheros tipo "EXT.snippets"
