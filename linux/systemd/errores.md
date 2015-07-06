Tras borrar un paquete puede que se haya quedado generado el enlace para que una app arranque al inicio. Tendremos que deshabilitarla a mano, aunque el programa ya no exista.
Ejemplo, tras instalar gdm y hacer un enable. Si borramos gdm, seguirá habiendo un enlace para arrancar gdm, deberemos ejecutar "systemctl disable gdm", si no el resto de gestores de sessión no se podrán poner como enable.


Failed at step EXEC spawning /usr/bin/rpi_user.sh: Exec format error
Tiene el script un shebang en la primera linea?



[/etc/rc.d/init.d/mysqld:10] Failed to add LSB Provides name start/stop.service, ignoring: Invalid argument
En la linea 10 se estaba definiendo mal el parámetro "Provides" (https://wiki.debian.org/LSBInitScripts)



El estado dice: active (exited)
Dar a stop y luego a start
