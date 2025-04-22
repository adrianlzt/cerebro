apt-get install xclip

```bash
echo "lo que se copiara al clipboard" | xclip
```

Pega el contenido del clipboard a un fichero

```bash
xclip -o > fichero
```

Copiar una imagen al portapapeles:

```bash
xclip -t image/png < fichero.png
```
