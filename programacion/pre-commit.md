<https://pre-commit.com/>

A framework for managing and maintaining multi-language pre-commit hooks.

Instalación

```bash
pacman -S python-pre-commit
```

Generar una config de ejemplo:

```bash
pre-commit sample-config > .pre-commit-config.yaml
```

Para instalar el hook en un repo determinado:

```bash
pre-commit install --hook-type commit-msg
```

Desactivarlo para un commit en concreto:

```bash
git commit --no-verify ...
git commit -n ...
```

Ejecutarlo a mano

```bash
pre-commit run --all-files --force
```

# Global

Podemos ponerlo también a nivel global.

Copiar este fichero <https://gist.github.com/6ac7467b5f9d255c63ee289cfafcca84> en ~/.git_hooks/pre-commit

Y en ~/.gitconfig tendremos que tener:

```
[core]
    hooksPath = ~/.git_hooks
```

Si queremos instalar pre-commit en otro repo tendremos que desactivar esa configuración global.

```bash
GIT_CONFIG=. pre-commit install
```

Y tras instalarlo tendremos que forzar el hooks path al repo:

```bash
git config core.hookspath $PWD/.git/hooks
```

El problema de forzar el directorio es que si movemos el path se romperá.

Parece que no se puede hacer unset de un valor global, solo pisarlo: <https://stackoverflow.com/questions/17205825/is-there-a-way-to-unset-a-global-git-config-section-in-a-local-git-config-file>

# Extensiones

Hooks interesantes:

<https://gruntwork.io/repos/v0.1.10/pre-commit>

Conventional commit

<https://github.com/dev-build-deploy/commit-me/blob/main/docs/pre-commit.md>

Instala otro hook, "commit-msg".
Podemos ponerlo en el .pre-commit-config.yaml:

```
default_install_hook_types:
  - pre-commit
  - commit-msg
```

Ejemplos pygrep:
<https://github.com/pre-commit/pygrep-hooks/blob/main/.pre-commit-hooks.yaml>
