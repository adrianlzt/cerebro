http://oprofile.sourceforge.net

Profile is a system-wide profiler for Linux systems, capable of profiling all running code at low overhead. OProfile is released under the GNU GPL.


Una de las features:
Single process profiling
Application developers will find the single process profiling feature very convenient since it does not require root authority, and profile data is collected only for the specified process (or command). This method has the added benefit of "following" fork/execs and collecting profile information on those child processes as well. Note: This method of profiling requires a kernel version of 2.6.31 or higher.

Debe estar cargado en la conf del kernel
# grep -i oprofile /boot/config-3.13.10-200.fc20.x86_64 
CONFIG_OPROFILE=m


ophelp		muestra eventos CPU disponibles
opcontrol	arranca/para recolección. Conf de eventos a recoger
operf		
opreport
oprofiled
oprof_start
opannotate

oprofile-gui


Para arrancar oprofiling:
yum install kernel-debuginfo
  Muy grande (~500MB)
También con: debuginfo-install kernel

opcontrol --init
  carga el módulo del kernel
echo "0" > /proc/sys/kernel/nmi_watchdog

In Red Hat Enterprise Linux 6.1, the nmi_watchdog registers with the perf subsystem. Consequently, during boot, the perf subsystem grabs control of the performance counter registers, blocking oprofile from working. To resolve this, either boot with the nmi_watchdog=0 kernel parameter set, or run echo 0 > /proc/sys/kernel/nmi_watchdog to disable at run time. To re-enable the watchdog, use the command echo 1 > /proc/sys/kernel/nmi_watchdog.

opcontrol --setup --vmlinux=/usr/lib/debug/lib/modules/3.14.1-200.fc20.x86_64/vmlinux

Mostrar gráfico con las llamadas que realiza 'ls'
operf -g ls
opreport -c -g -d
  -c call graph
  -g incluye nombre del source file y línea
  -d más detalle


Imprime código anotado con info OProfile. Necesitamos el código fuente.
Nos pone el código fuente con las notas de oprofile
opannotate -a -s
  -a ensamblador
  -s codigo fuente
Necesita:
  apt-get source eglibc
  mkdir -p /build/buildd/
  ln -s eglibc-2.19 /build/buildd/eglibc-2.19


## ERRORES ##

# ophelp 
Using timer interrupt.

http://comments.gmane.org/gmane.linux.oprofile/8135
Do 'opcontrol --init'; then 'cat /dev/oprofile/cpu_type' -- if this says "timer", then your kernel
either doesn't support performance counters or the oprofile kernel option isn't configured right
