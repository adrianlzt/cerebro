http://www.cyberciti.biz/open-source/command-line-hacks/pv-command-examples/

apt-get install pv

pv fichero.grande > copia.fichero

No muestra una barra de progreso de como va la copia


Podemos meterlo como una pipe:
... | pv -cN nombre | ...
