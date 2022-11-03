https://pre-commit.com/

A framework for managing and maintaining multi-language pre-commit hooks.

Instalación
pacman -S python-pre-commit

Generar una config de ejemplo:
pre-commit sample-config > .pre-commit-config.yaml


Podemos ponerlo también a nivel global.
Copiar este fichero https://gist.github.com/6ac7467b5f9d255c63ee289cfafcca84 en ~/.git_hooks/pre-commit

Y en ~/.gitconfig tendremos que tener:
```
[core]
    hooksPath = ~/.git_hooks
```



Ejemplos pygrep:
https://github.com/pre-commit/pygrep-hooks/blob/main/.pre-commit-hooks.yaml
