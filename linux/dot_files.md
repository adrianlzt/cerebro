<http://www.electricmonk.nl/log/2015/06/22/keep-your-home-dir-in-git-with-a-detached-working-directory/>

config='git --git-dir=/home/adrian/.config.git/ --work-tree=/home/adrian'

# Chezmoi

[chezmoi](https://www.chezmoi.io/).

Crea un repo git en ~/.local/share/chezmoi/

Añadir ficheros con:

```bash
chezmoi add ~/.bashrc
```
