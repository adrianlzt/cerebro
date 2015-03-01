El umask se puede definir a nivel global en tres sitios:
/etc/login.defs
/etc/pam.d (pam_umask.so)
/etc/profile

Si queremos modificar el umask de un script de init.d lo podemos hacer de varias maneras:
Poniendo umask en el script (grep umask /etc/init.d/*)
Pasandole la opción umask al start-stop-daemon
Modificando el ejecutable para que llame a umask.




# Obtener umask de un running process
http://www.microhowto.info/howto/inspect_the_umask_of_a_running_process.html
http://www.hostatic.ro/2011/04/11/getting-the-umask-of-a-running-process/

yum install -y gdb
gdb --pid=PROCESO
call umask(0)
$1 = 18
  este es el umask que tenia (por que lo acabamos de cambiar a 0) en octal
  convertir octal a hexadecimal:
    echo "obase=8; NUMERO" | bc

call umask(18)
  para dejarlo como estaba


