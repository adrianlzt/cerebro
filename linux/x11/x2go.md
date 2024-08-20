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

sudo x2godbadmin --createdb

# Client

x2goclient

Aquí crearemos sesiónes, que accederan por ssh.
Podremos mostrar el escritorio tal y como esté arrancado en remoto o arrancar aplicaciones determinadas.
