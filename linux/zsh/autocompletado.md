http://zsh.sourceforge.net/Doc/Release/Completion-System.html
https://askql.wordpress.com/2011/01/11/zsh-writing-own-completion/
https://github.com/zsh-users/zsh-completions/blob/master/zsh-completions-howto.org

Recargar configuraciones:
rehash

En .zshrc
# COMPLETION SETTINGS
# # add custom completion scripts
fpath=(~/.zsh/completion $fpath)

~/.zsh/completion/_hello
#compdef hello

_arguments "1: :(World 'Otra opcion')"    Separamos con espacios en blanco las opciones
_arguments "2: :(Europa America)"         Estos son valores posibles para el segundo parametro

El nombre del script da igual como se llame, pero que empieze por "_"


Usar la lista de ficheros de un directorio como autocompletado:
http://stackoverflow.com/questions/4187444/can-not-populate-zsh-autocompletion-with-simple-ls-output


# Ejemplos
/usr/share/zsh/site-functions

## Ejemplo con lista estática de posibilidades
local -a options arguments
options=('-c:description for -c opt' '-d:description for -d opt')
arguments=('e:description for e arg' 'f:description for f arg')
_describe 'values' options -- arguments


## Ejemplo con lista customizada de opciones y otra opción (files) generada dinámicamente
_alternative 'args:custom args:(a b c)' 'files:filenames:_files'

Otro ejemplo donde se generan dinámicamente la lista de directorios de usuario y los pids existentes
_alternative "dirs:user directories:($userdirs)"\
             "pids:process IDs:($(ps -A o pid=))"

# _arguments
This is a utility function that makes it easy to write simple completion functions. The _arguments function is a wrapper around the compadd builtin function. The compadd builtin is the core function used to add completion words to the command line, and control its behaviour. However, most of the time you will not need to use compadd, since there are many utility functions such as _arguments and _describe which are easier to use.

Sigue el formato:
OPT[DESCRIPTION]:MESSAGE:ACTION

Si no ponemos MESSAGE nos permitirá este parámetro varias veces. Si ponemos clave, una vez relleno, ya no lo mostrará en el autocompletado.

## actions
https://github.com/zsh-users/zsh-completions/blob/master/zsh-completions-howto.org#actions
En actions podemos declararas directamente: (valor1 valor2 valor3)
O llarma a una función: _get_names

_get_names() {
  local -a names
  names=(
    "valor1"
    "valor2"
    "valor3"
  )

  _describe Nombres names
}
Esta función podría hacer cualquier cosa, por ejemplo obtener los valores de un fichero


# _describe
Used for creating simple completions consisting of single words with descriptions (but no actions). Easier to use than _arguments


# Alias
No me funciona el compdef con un alias tipo "/usr/bin/python /tmp/script.py"
Lo meto como función en vez de alias y funciona bien.


# GNU
Si el comando tiene un --help estandar podemos usar:
compdef _gnu_generic comandognu

Y automáticamente se generará el autocompeltion
