https://nixos.org/
https://wiki.archlinux.org/title/Nix

Declarative builds and deployments.

# Install
yay nix zsh-nix-shell nix-zsh-completions
  el segundo paquete es para que los nuevos entornos usen zsh en vez de bash
  el tercero para autocompletar nix-env y nix-shell

sc-start nix-daemon
sudo gpasswd -a adrian nix-users

Añadir al path
$HOME/.nix-profile/bin

Añadir un canal y actualizarlo:
nix-channel --add https://nixos.org/channels/nixpkgs-unstable
nix-channel --update

# Uso

## Instalar "localmente"
Consultar paquetes instalados:
nix-env --query

Instalar un paquete:
nix-env -iA nixpkgs.hello
  va creando links en ~/.nix-profile/bin a las ubicaciones reales (tipo /nix/store/63l345l7dgcfz789w1y93j1540czafqh-hello-2.12.1/bin/hello)

Borrarlo:
nix-env --uninstall hello



## Shells
Crear un entorno con el paquete nodejs instalado.
nix-shell --packages nodejs

Me abre una nueva shell con bash.
En el PATH tendré todos los paths de los distintos paquetes que usa, tipo /nix/store/XXXXX-paquete-VERSION/bin
