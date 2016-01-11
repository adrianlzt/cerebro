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

Apps:
TweetDeck
Advanced REST console
Webogram (telegram)
Feedly


Internals:

Listado de todas las urls propias de chrome
chrome://chrome-urls/

Consumo de memoria por pestaña
chrome://memory-redirect/


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
