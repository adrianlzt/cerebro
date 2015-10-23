# Operaciones
systemctl start gdm
systemctl stop rsyslog
  Primero se ejecuta ExecStop (si definido)
  Si siguen quedando procesos se les envia un SIGTERM (15)
  Si siguen quedando procesos se les envia un SIGKILL (9)
systemctl reload gdm
  recargar configuración sin parar el proceso
systemctl reload-or-restart gdm
systemctl restart gdm
systemctl try-restart gdm
  reinicia el servicio solo si ya estaba corriendo
systemctl reload-or-try-restart gdm

systemctl kill rsyslog
systemctl kill -s 9 rsyslog
  tambien se puede pasar un nombre: SIGTERM, SIGINT, SIGSTOP...
  --kill-who=[main|control|all], por defecto all. Decimos a quien enviamos la señal, al padre, control proces, etc. Mirar man

systemctl isolate rsyslog
  cambiar el runlevel

systemctl reload-daemon
  recarga la conf de las unidades


# Check estado - mirar status al final
systemctl status
systemctl status proceso
  Los procesos se llaman: nombre.service
  nos dice script de inicio, desde cuando está activa, pid, cgroup, parámetros de ejecucción, ultimas trazas de log, etc.
  si está parada nos dice desde cuando, cual era su pid y con que return code salió
systemctl status proceso -l
  mostrar todo el output del log para este servicio
systemctl is-active httpd
systemctl is-enabled httpd
systemctl is-failed httpd


# Listar
systemctl
  lista de unidades

systemctl list-unit-files
  muestra todos las unidades que existen en el sistema (/usr/lib/systemd/system/ and /etc/systemd/system/)
  muestra las configuradas y las no configuradas
systemctl list-unit-files --type service
  ver que servicios están activados
  static: funciona como dependencia de otros services

systemctl list-units --all
  mostrar todas las unidades, cargadas o no (activas e inactivas)
systemctl list-units --type service
  mostrar las unidades tipo service


# Activar o desactivar
systemctl disable rsyslog
systemctl enable rsyslog
  ln -s '/lib/systemd/system/rsyslog.service' '/etc/systemd/system/multi-user.target.wants/rsyslog.service'
systemctl reenable rsyslog
  regenera los enlaces aunque ya existan


# Limitar arranque
systemctl mask rsyslog
  Previene que un usuario, u otro proceso, arranque rsyslog
  ln -s '/dev/null' '/etc/systemd/system/rsyslog.service'
  No los limita del arranque
systemctl mask rsyslog --runtime
  hasta el reinicio, prohibir que este servicio arranque
systemctl unmask rsyslog




# Sockets #
systemctl list-units --all --type=socket

# Variables #
systemctl show
  mostrar variables
systemctl show SERVICIO

systemctl show -p Architecture
  mostrar una variable en particular

systemctl set-property UNIDAD NOMBRE=VALOR
systemctl set-property httpd.service CPUAccounting=yes


# Dependencias #
systemctl list-dependencies UNIDAD
  mostrar dependencias necesarias para arrancar UNIDAD
list-dependencies --reverse UNIDAD
  mostrar la unidades que necesitan de UNIDAD


# No se pueden ejecutar tareas custom
Eg.: service postgres initdb


# Status
Loaded
Active (running)
Active (exited)
Active (waiting) - running but waiting for an event
Inactive - not running
Enabled
Disabled
Static - Can not be enabled, but may be started by an enabled unit automatically


# Default targets (antiguos runleves)
systemctl get-default
systemctl set-default


Sysvinit Runlevel       	Systemd Target                                        	Notes
0           	            runlevel0.target, poweroff.target                     	Halt the system.
1, s, single	            runlevel1.target, rescue.target	                        Single user mode.
2, 4	                    runlevel2.target, runlevel4.target, multi-user.target	  User-defined/Site-specific runlevels. By default, identical to 3.
3	                        runlevel3.target, multi-user.target	                    Multi-user, non-graphical.
                                                                                  Users can usually login via multiple consoles or via the network.
5	                        runlevel5.target, graphical.target	                    Multi-user, graphical. Usually has all the services of
                                                                                  runlevel 3 plus a graphical login.
6	                        runlevel6.target, reboot.target	                        Reboot
emergency	                emergency.target	                                      Emergency shell


# Power management
hibernate
poweroff
halt
etc
