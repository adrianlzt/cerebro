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

