<https://nlewo.github.io/nixos-manual-sphinx/installation/upgrading.xml.html>

Cambiar de canal (mirar en <https://channels.nixos.org/>):

```bash
nix-channel --add https://nixos.org/channels/nixos-25.05-small nixos
```

Usamos "-small" si es un servidor (no desktop).

Actualizamos:

```bash
nixos-rebuild switch --upgrade
```

Reiniciar si es necesario (cambio de kernel). Parece que lo dice si es necesario.
