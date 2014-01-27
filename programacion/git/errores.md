Errores

git-upload-pack: command not found:

Probar cual es el PATH que se define para consolas no interactivas:
$ ssh user@maquina echo \$PATH
Posiblemente el problema sea que hay distintas configuraciones para shell interactiva (.zshrc) y para shell no interactiva (.zshenv)
