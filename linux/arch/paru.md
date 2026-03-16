# Descargar un AUR

```bash
paru -G foo
cd foo
paru -Ui # build from source + install. Puede gestionar dependencias de AUR

# O con makepkg
makepkg -si
```

# Ignorar GPG key

```bash
paru -S --mflags --skipinteg PAQUETE
```
