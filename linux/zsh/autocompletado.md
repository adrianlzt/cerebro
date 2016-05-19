http://zsh.sourceforge.net/Doc/Release/Completion-System.html
https://askql.wordpress.com/2011/01/11/zsh-writing-own-completion/
https://github.com/zsh-users/zsh-completions/blob/master/zsh-completions-howto.org


En .zshrc
# COMPLETION SETTINGS
# # add custom completion scripts
fpath=(~/.zsh/completion $fpath) 

~/.zsh/completion/_hello
#compdef hello

_arguments "1: :(World)"


Usar la lista de ficheros de un directorio como autocompletado:
http://stackoverflow.com/questions/4187444/can-not-populate-zsh-autocompletion-with-simple-ls-output

