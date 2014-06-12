Errores

git-upload-pack: command not found:

Probar cual es el PATH que se define para consolas no interactivas:
$ ssh user@maquina echo \$PATH
Posiblemente el problema sea que hay distintas configuraciones para shell interactiva (.zshrc) y para shell no interactiva (.zshenv)


Tras un git status nos devuelve:
# Your branch is ahead of 'origin/pro/2.2.0' by 4 commits.
Esto puede ser mentira y que en realidad si esté sincronizado.
Se puede hacer un fetch para evitar ese mensaje erróneo.
