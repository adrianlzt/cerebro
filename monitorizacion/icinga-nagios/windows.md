http://www.nsclient.org/
http://docs.nsclient.org/reference/index.html

Se usa como nrpe. Se debe instalar NSclient en la maquina windows y se pueden consultar los valores con check_nrpe.
Los modules son los checks que se pueden ejecutar.

Configuración con un fichero nsclient.ini (ejemplo de fichero en este mismo dir)
Hay que decir que modulos cargar (seria como instalar los rpms de los checks).
Luego crearemos alias para llamar a esos checks con unos parametros determinados. Estos parametros y sus opciones se pueden mirar en la web de modules.

Al definir los alias se les pueden pasar los parametros de check_nrpe
alias_cpu = check_cpu filter=none “warn=load > $ARG1$” “crit=load > $ARG2$”
check_nrpe!alias_cpu -a 60 70
check_nrpe -H 1.2.3.4 -c alias_cpu -a 60 70

## Instalación ##
http://docs.nsclient.org/tutorial/nagios/nrpe.html#tutorial-nagios-nrpe
Nos pedirá los allowed hosts y seleccionar que cosas queremos habilitar.

Seleccionaremos los common checks y check_nrpe


Fichero de configuración: %ProgramFiles%\NSClient++\nsclient.ini


## Test ##
C:\Program Files\NSClient++>nscp test

## Graphite ##
Puede enviar datos a Graphite


## Análisis de que checks básicos poner en un sistema windows ##
Para version => 0.4.2
Mirar fichero de conf nrpe: windows_basic.cfg
Mirar fich de conf para nsclient para estos check nrpe nsclient.ini

CPU / Load
check_nrpe!alias_cpu
alias_cpu = check_cpu filter=none “warn=load > 80” “crit=load > 90”

Disk_all
check_nrpe!alias_disk
alias_disk = check_drivesize "crit=free<10%" "warn=free<20%" drive=*

Memory
check_nrpe!alias_mem
alias_mem = check_memory "warn=free < 30%" "crit=free < 10%"

Uptime
check_nrpe!alias_uptime
alias_uptime = check_uptime "warn=uptime < -25m"

Terminal Server
check_nrpe!alias_termservice_srv
alias_termservice_srv = check_service "service=TermService

Swap / Pagefile 
check_nrpe!alias_pagefile
alias_pagefile = check_pagefile "warn=free < 90%" "crit=free < 40%"




Net_interfaces
http://www.nsclient.org/forums/topic/old-1189/
http://exchange.nagios.org/directory/Plugins/Network-Connections,-Stats-and-Bandwidth/check_interfaces_wmi/details
http://www.claudiokuenzler.com/nagios-plugins/check_win_net_usage.php#.VC6FrHVJV5Q
http://exchange.nagios.org/directory/Plugins/Operating-Systems/Windows/Check-Windows-Network-Traffic-2FUsage/details
SE PUEDE?
NO LO PONEMOS

Open_files // openfiles // {"args":"-w 50 -c 80"} // History
http://docs.nsclient.org/reference/CheckDisk.html#check-files
SE PUEDE?
NO LO PONEMOS

Procs_zombies
http://docs.nsclient.org/reference/CheckSystem.html#check-process
http://blogs.msdn.com/b/oldnewthing/archive/2004/07/23/192531.aspx
SE PUEDE?
NO LO PONEMOS

Users
http://nsclient.org/nscp/wiki/guides/nagios/check_user
http://docs.nsclient.org/reference/CheckWMI.html#check-wmi
NO LO PONEMOS

Windows updates disponibles
http://zeldor.biz/2012/02/icinganagios-check-windows-updates/
http://exchange.nagios.org/directory/Plugins/Operating-Systems/Windows/Check-Available-Updates/details
NO LO PONEMOS



Check de un servicio
check_nrpe!alias_NOMBRE_srv
alias_NOMBRE_srv = check_service "service=NOMBRE"

Check de un proceso
check_nrpe!alias_NOMBRE_proc
alias_NOMBRE_proc = check_process process=explorer.exe

Performance counters
http://docs.nsclient.org/reference/CheckSystem.html#check-pdh
check_pdh "counter=foo" "warn=value > 80" "crit=value > 90"

Tasks
http://docs.nsclient.org/reference/CheckTaskSched.html#check-tasksched
Alarmar si una tarea lleva mucho tiempo en ejecucción.
Alarmar si una tarea ha terminado con error.
Con el check viejo:
alias_sched_all = CheckTaskSched "filter=exit_code ne 0" "syntax=%title%: %exit_code%" warn=>0
alias_sched_long = CheckTaskSched "filter=status = 'running' AND most_recent_run_time < -$ARG1$" "syntax=%title% (%most_recent_run_time%)" warn=>0
alias_sched_task = CheckTaskSched "filter=title eq '$ARG1$' AND exit_code ne 0" "syntax=%title% (%most_recent_run_time%)" warn=>0
