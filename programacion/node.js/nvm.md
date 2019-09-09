Gestor de entornos virtuales para node.

# Instalación
## Arch
yaourt -S nvm

# Uso
/bin/bash
nvm install 4.2

nvm use 4.2

nvm use system
  volver al node del sistema

nvm alias default XXX
  definir una versión como default

Recordar hacer un:
nrpm rebuild
si ya teníamos bajadas ciertas deps
