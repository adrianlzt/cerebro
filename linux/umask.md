El umask se puede definir a nivel global en tres sitios:
/etc/login.defs
/etc/pam.d (pam_umask.so)
/etc/profile

Si queremos modificar el umask de un script de init.d lo podemos hacer de varias maneras:
Poniendo umask en el script (grep umask /etc/init.d/*)
Pasandole la opción umask al start-stop-daemon
Modificando el ejecutable para que llame a umask.
