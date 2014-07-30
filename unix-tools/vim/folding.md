http://vim.wikia.com/wiki/Folding

Activar:
:set foldenable

Definir método:
:set foldmethod=syntax
:set foldmethod=indent
:set foldmethod=manual

Parámetros
:set foldlevel=3  Los fold de tercer orden aparecen cerrados. Se cambia con zr,zm
:set foldlevelstart=20  Solo aplica en el arranque

# Comandos básicos #
za  toggle fold
zc  cerrar fold
zo  abrir fold
zr  abrir todos los fold de un orden más (modifica foldlevel)
zm  cerrar todos los fold de un orden mas (modifica foldlevel)
zR  abrir todos los folds
zM  cerrar todos los fold

# Manual #
v{motion}zf  crear fold con 'visual'
zf3j  crear fold con las tres próximas líneas
zd  borrar fold

# Indent #
:set shiftwidth=2  Esto es para determinar cuanto se considera identado. 2 es dos espacios en blanco. Por defecto es tabulador

