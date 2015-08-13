Es un script que pasamos con la creación de la máquina para que se ejecute en el arranque:

La máquina lo obtiene consultando:
curl http://169.254.169.254/1.0/user-data

Se ejecuta mediante el script
/etc/rc3.d/S51cloud-init

En /var/lib/cloud podemos encontrar ficheros relativos a la ejecucción.

Y los ficheros de log:
/var/log/cloud-init.log
/var/log/cloud-init-output.log



Ejemplo

#!/bin/bash
python -m SimpleHTTPServer 5666 &
