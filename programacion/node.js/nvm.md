Gestor de entornos virtuales para node.

# Instalación
## Arch
yaourt -S nvm

# Uso
/bin/bash
nvm install 4.2

nvm ls
  listar versiones instaladas

nvm ls-remote --lts
  mirar que versiones lts podemos instalar

nvm use 4.2

nvm use system
  volver al node del sistema

nvm alias default XXX
  definir una versión como default

Recordar hacer un:
nrpm rebuild
si ya teníamos bajadas ciertas deps
