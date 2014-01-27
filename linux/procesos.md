disown, zombie children, and the uninterruptible sleep
https://blogs.oracle.com/ksplice/entry/disown_zombie_children_and_the


Resume a stopped (T in ps -aux) process from a different shell:
kill -18 <pid>  //Send a SIGCONT signal


Mantener servicios en ejecución (que cuando cerremos el terminal no mate los procesos que de él cuelgan)

Si lo sabemos con antelación:

## screen ##

## nohup ##
Para algo más sencillo se puede usar nohup (http://serverfault.com/questions/24425/can-i-nohup-screen-an-already-started-process).
Esto ignora las señales hangup que enviaría la shell cuando hicíesemos exit a todos los procesos que cuelgan de ella.
Por defecto envía la salida estandar a nohup.out


Para procesos que ya están corriendo

## disown ##
Esto permite decirle a un programa que se encuentra corriendo actualmente que ignore las señales hangup, y así poder corriendo aunque se cierre la shell.


## screen + reptyr ##
http://serverfault.com/questions/55880/moving-an-already-running-process-to-screen
Started a long-running process over ssh, but have to leave and don't want to interrupt it? Just start a screen, use reptyr to grab it, and then kill the ssh session and head on home.
