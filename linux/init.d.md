Como escribir ficheros de init.d. Algunas reglas:

http://stackoverflow.com/questions/696839/how-do-i-write-a-bash-script-to-restart-a-process-if-it-dies


Comprobar el estado de un proceso que nos ha dejado un .pid
kill -0 `cat /var/run/docker.pid`
No es perfecto, ya que si el fichero no existe, pero el proceso está corriendo, dirá que no se está ejecutando.
Mirar /lib/lsb/init-functions -> pidofproc



/etc/inittab
runlevel en el que arranca la máquina

# Default runlevel. The runlevels used are:
#   0 - halt (Do NOT set initdefault to this)
#   1 - Single user mode
#   2 - Multiuser, without NFS (The same as 3, if you do not have networking)
#   3 - Full multiuser mode
#   4 - unused
#   5 - X11
#   6 - reboot (Do NOT set initdefault to this)

runlevel
  comando que nos dice en que run level estábamos y en cual estamos

telinit X
  para cambiar al runlevel X


En sistemas con upstart, los scripts de sysv-rc se ejecutan mediante
/etc/init/rc.conf
Este ejecuta
/etc/rc.d/rc $RUNLEVEL


# SysV-rc
/etc/rc.d/init.d
  directorio donde se encuentran los scripts (/etc/init.d es un enlace a este dir)
/etc/rc.d/rcN.d/
  aqui encontramos enlaces a /etc/rc.d/init.d con nombres KnnNOMBRE o SnnNOMBRE
  Cuando cambiamos a un runlevel, primero se ejecutan todos los Knn (en el orden que indique el número nn), y luego lo Snn.
  A los Knn se les llama con stop, y a los Snn con start.

/etc/rc.d/rc.local
  para ejecutar algo tras todo el proceso de arranque de SysV

/etc/rc.d/rc
  This file is responsible for starting/stopping services when the runlevel changes
  Este script, entre otras cosas, recorre los KnNOMBRE y SnnNOMBRE arracándolos o parándolos

  Si no existe /var/lock/subsys/NOMBRE o /var/lock/subsys/NOMBRE.init no se hará stop
  También se comprueba que el fichero exista y sea ejecutable
  No se tendrán en cuenta los ficheros: *~ | *.bak | *.orig | *.rpmnew | *.rpmorig | *.rpmsave


Los scripts de init.d necesitan tener un fichero de lock: https://www.redhat.com/magazine/008jun05/departments/tips_tricks/
Esto sirve porque puede haber servicios que tengan varios PIDs y conocer el estado de uno de estos PID puede no ser suficiente para determinar el estado del servicio.

Parece que lo que se suele hacer es arrancar el programa con la función daemon() y luego hacer:
[ $RETVAL -eq 0 ] && touch /var/lock/subsys/xinetd
return $RETVAL

