La configuración del sistema se hace en /etc/nixos/configuration.nix

Main config file that describes your system, and what nix uses to rebuild your image and even update

Podemos hacer imports de otros ficheros para dividir la configuración.

Para aplicar los cambios se usa:

```bash
nixos-rebuild switch
```

nixos-rebuild is the command to build a new image based off the config file, and “switch” means switch to it right now (no reboot needed).

Cada rebuild nos deja una imagen del sistema a la que podemos volver desde el boot loader.

Para ver la lista de imágenes:

```bash
nixos-rebuild list-generations
```

Si queremos hacer limpieza:

```bash
nix-collect-garbage -d # borra todo lo que no se esté usando
nix-collect-garbage --delete-older-than 30d # borra todo lo que tenga más de 30 días
```

# Actualizar el sistema

```bash
nixos-rebuild boot --upgrade
```

# Paquetes temporales

Si queremos instalar algo sin meterlo permanentemente en el sistema, podemos arrancar una nueva shell con ese paquete instalado:

```bash
nix-shell -p paquete
```
