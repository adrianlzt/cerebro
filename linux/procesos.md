mirar reptyr.md


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

lo detacha de nuestra terminal, puede seguir corriendo en primer plano aunque cerremos la terminal
la salida va a nohup.out


Para procesos que ya están corriendo

## disown ##
Esto permite decirle a un programa que se encuentra corriendo actualmente que ignore las señales hangup, y así poder corriendo aunque se cierre la shell.
Parece que si la app quiere escribir en stdout/err pero hemos cerrado la shell fallará y saldrá.

programa_largo >& LOG
control+z
bg %
disown %

Si el proceso va a escribir en stdout/err necesitaremos cambiar su fd/0 y fd/1 a un fichero (el proceso creo que se detiene mientras estamos con el gdb)
Esto lo haremos antes de hacer el control+z
https://stackoverflow.com/questions/1323956/how-to-redirect-output-of-an-already-running-process
sudo gdb -p PID
p close(1)
p creat("/tmp/foo3", 0600)
p close(2)
p creat("/tmp/foo3", 0600)
control+d
y



## detach + reptyr ##
mirar reptyr.md
http://serverfault.com/questions/55880/moving-an-already-running-process-to-screen
Started a long-running process over ssh, but have to leave and don't want to interrupt it? Just start a screen, use reptyr to grab it, and then kill the ssh session and head on home.

https://johnlane.ie/detach-your-shell.html
sudo setcap cap_sys_ptrace=eip /usr/bin/reptyr

En una terminal: top
En otra:
reptyr $(pgrep top)




http://www.ucc.asn.au/~dagobah/things/grab.c
parece que es para x86 32 bits

injcode
https://blog.habets.se/2009/03/Moving-a-process-to-another-terminal
parece que tambien para 32 bits

neercs
http://caca.zoy.org/wiki/neercs
no me funciona el grab
  neercs -P xxx

# cryopid
https://code.google.com/archive/p/cryopid/

CryoPID can move your running Linux programs from one computer to another

Newer Linux kernels have changed the way that processes are organized. Unfortunately, earlier developers of CryoPID have not had the non-trivial amounts of time for tracking the internals of each new kernel version. Newer (and older) releases no longer work correctly.

We are actively trying to close this gap.
