Para que no proteste al arrancar, salir con Control+Mayus+Q


Para que Chrome coja los eventos de calendario que pueden aparecer en los emails de gmail (.ics), hay que darle a un botón que aparece a la derecha de la barra de direcciones para permitir a chrome coger estos eventos.


Extensiones para chrome:
pushbullet
pocket
hangouts
google dictionary
wolfram alpha
springpad
ad blocker plus
stylish
sense (json elasticsearch)
speed tracer (debugger)
Gmail checker plus
Google calendar checker plus
Escritorio remoto de Chrome (controlar pc remotamente)
https://chrome.google.com/webstore/detail/facebook-for-chrome/gdalhedleemkkdjddjgfjmcnbpejpapp

https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif/related
Proxy SwitchyOmega

Usar chrome como vim
https://chrome.google.com/webstore/detail/vrome/godjoomfiimiddapohpmfklhgmbfffjj/related

http://www.microsiervos.com/archivo/internet/extension-chrome-tomar-notas-video.html

Apps:
TweetDeck
Advanced REST console
Webogram (telegram)
Feedly

https://chrome.google.com/webstore/detail/full-page-screen-capture/fdpohaocaechififmbbbbbknoalclacl
hace una captura de pantalla de una web entera, haciendo el scroll necesario

https://www.grammarly.com
un corrector ortográfico avanzado


Internals:

Listado de todas las urls propias de chrome
chrome://chrome-urls/

Consumo de memoria por pestaña
chrome://memory-redirect/

Caches DNS
chrome://net-internals/#dns


Task Manager: consumo de memoria, cpu, red, e id del proceso
Shift+Esc



# Flash, chromium
packer -S chromium-pepper-flash
chrome://plugins
  activarlo

# Proxy

## Socks
https://www.chromium.org/developers/design-documents/network-stack/socks-proxy


Usar localhost:8888 como proxy socks
chromium --proxy-server="socks5://localhost:8888" --host-resolver-rules="MAP * 0.0.0.0 , EXCLUDE localhost"


# Bug chrome X11
Si vemos que renderiza mal:

/etc/X11/xorg.conf.d/20-intel.conf
# Fix Chrom[e,ium] tab swiching and refresh/redraw issue
# https://bugs.freedesktop.org/show_bug.cgi?id=91558
Section "Device"
        Identifier  "Intel Graphics"
        Driver      "intel"
        Option      "AccelMethod"  "uxa"
EndSection

