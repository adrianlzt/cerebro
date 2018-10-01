Terminal similar a los entornos cisco.

?
muestras los comandos disponibles

sh ?
muestra las opciones del comando "show"

Para entrar a la config:
config

Para guardar la config:
copy running-config startup-config
https://www.dell.com/support/article/fr/fr/frbsdt1/how10280/how-to-save-and-back-up-your-configuration-on-dell-powerconnect-force10-and-n-series-switches-via-cli?lang=en

Info del sistema (modelo, version, MAC, etc):
sh system


# Logging
show logging
  ver config

Desactivar mensajes de puertos up/down de la consola
conf
logging console errors


# Tabla de MACs - Puerto
show bridge address-table


# Descripciones de los puertos (definidas a mano)
show interfaces description

Para editar esa descr:
conf
interface ethernet g3
description pepe


# Login
Ver conf
sh auth methods

Local -> usando user y pass
Line -> usando una password definida en la linea para poder acceder

configurar user/pass
aaa authentication login default local
aaa authentication enable default enable


# SSH
https://www.dell.com/support/article/fr/fr/frbsdt1/how10442/how-to-enable-https-ssh-and-disable-http-telnet-for-switch-management-on-powerconnect-5500-series-switches?lang=en
sh ip ssh
  para conocer el estado


Para activar ssh:
conf term
ip ssh server

Tenemos que tener las claves pregeneradas
crypto key generate rsa
crypto key generate dsa


Acceder con pubkey
https://mtu.net/~engstrom/ssh-key-auth-powerconnect/
config
crypto key pubkey-chain ssh
user-key root rsa
key-string AAAA...
  dos veces intro (no pegar la parte de "ssh-rsa" ni el final tipo "blabla@email")

No es muy util, porque siempre tendremos que seguir metiendo user y pass:
http://www.admlife.de/2013/02/06/dell-about-ssh-key-authentication-on-powerconnect-m6220/
https://mtu.net/~engstrom/ssh-key-auth-powerconnect/
