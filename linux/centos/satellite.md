API: https://access.redhat.com/site/documentation/en-US/Red_Hat_Network_Satellite/5.5/html/API_Overview/index.html

Es la máquina que controla las máquinas redhat registradas.
Puede controlar la instalación de paquetes, configuraciones, ejecución de comandos, etc.

También tiene información sobre los paquetes instalados en cada máquina (de los cánales, repos, oficiales)

La api es XML-RPC.

Ejemplos en perl y python:
https://access.redhat.com/site/documentation/en-US/Red_Hat_Network_Satellite/5.5/html/API_Overview/files/html/scripts.html


Para conectar con el Red Hat Network hay dos maneras.
A mano, con rhn_check (-vvv para más info)
Demonio corriendo: rhnsd
  Se ejecuta cada: cat /etc/sysconfig/rhn/rhnsd . Por defecto 240'. Se puede reducir hasta 60'
Si tenemos osad corriendo los comandos se ejecutarán automáticamente.
