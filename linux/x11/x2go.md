# x11 remoto con compresión

```bash
ssh -Y -C -c aes128-ctr HOST
```

-C (Compression): This is the most important flag. It compresses the data stream, which significantly reduces the bandwidth required for X11 bitmaps.

-c aes128-ctr (Faster Cipher): This forces a faster encryption algorithm. While modern CPUs handle standard encryption well, this can still shave off milliseconds of latency.

-Y (Trusted Forwarding): This is faster than standard -X forwarding because it bypasses some of the X11 security extension checks.

Warning: Only use -Y if you trust the remote server, as it technically allows a malicious remote application to mess with your local display.

# google chrome-remote-desktop

Podemos arrancarlo con un comando ssh y luego conectar desde el navegador.

aur/chrome-remote-desktop
El .deb está roto, usar el link aquí: <https://deb.rug.nl/ppa/mirror/dl.google.com/linux/chrome-remote-desktop/deb/pool/main/c/chrome-remote-desktop/>

Para configuralo:
crd --setup

Si ya tenemos abierto chrome en el pc remoto, deberemos cerrarlo para poder abrirlo en el remoto.

# X2Go

<https://wiki.archlinux.org/title/X2Go>

# Server

```bash
yay -S aur/x2goserver
sudo x2godbadmin --createdb
```

## Debug

/etc/x2go/x2goserver.conf

```
[log]
loglevel=debug
```

# Client

x2goclient

Aquí crearemos sesiónes, que accederan por ssh.
Podremos mostrar el escritorio tal y como esté arrancado en remoto o arrancar aplicaciones determinadas.
