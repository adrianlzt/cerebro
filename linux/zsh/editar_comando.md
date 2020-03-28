Para editar el comando que estamos escribiendo:
Control+x + control+e


https://www.reddit.com/r/vim/comments/9atgsj/edit_any_command_line_in_vim/
Hay que meter en el .zshrc

autoload -U edit-command-line
zle -N edit-command-line
bindkey -M vicmd v edit-command-line
