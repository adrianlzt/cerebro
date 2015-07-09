Forced node shutdown completed. Occured during startphase 0. Initiated by signal 9.

Este mensaje lo podemos ver en uno de los nodo de management cuando un data node intenta unirse. El data node ha sido matando bruscamente, puede que por el OOM killer porque la máquina se ha quedado sin ram. Necesitamos una máquina con más ram
Mirar el log (puede que en /data/) en el data node.



150529 19:16:06 [ERROR] Can't find messagefile '/usr/share/errmsg.sys'

http://askubuntu.com/questions/102875/mysql-5-5-starts-and-then-instantly-stops
No encuentra el fichero, arrancar con:
--lc-messages-dir="/usr/local/mysql/share/" (o donde este ese directorio)
