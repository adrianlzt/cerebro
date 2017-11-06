# Override de triggers
Uso el template de linux para los servers, pero para uno determinado quiero que el proc.num sea 1000 en vez de 300.
User macros? https://www.zabbix.com/forum/showthread.php?t=48985



# Trigger que salta un error
{Escalada:web.test.error[NOMBRE].last()}=1
  Cannot evaluate expression: expected numeric token at "Timeout was reached: Operation timed out after 15001 milliseconds with 0 bytes received)=1".

# Dashboard general
Cuando hay un problema, ver rápidamente porqué ha saltado. Valor actual vs trigger. O un acceso más directo al trigger.


# Monit web, evitar alarmar flapeos
Si pongo que el ultimo valor sea == 1 encuentro cuando falla, pero ante un fallo puntual me avisa, cosa no deseable.
Como meter una alarma que no avise ante estos fallos puntuales, pero si me avise si por ejemplo empieza a hacer 0,1,0,1,0,1...



# Actuar sobre varias keys simultaneamente
{Escalada:web.test.fail[].last()}=1

Que si cualquiera falla me avise.

O por ejemplo, que si cualquier fichero se modifica (cksum) me avise.

Script de autodiscover?



# Notificaciones
Que cuando sale el load, me envie el estado de cada una de las CPUs en el mensaje.
