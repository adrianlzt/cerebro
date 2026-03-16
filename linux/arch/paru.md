# Descargar un AUR

```bash
paru -G foo
cd foo
makepkg -si
```

# Ignorar GPG key

```bash
paru -S --mflags --skipinteg PAQUETE
```
