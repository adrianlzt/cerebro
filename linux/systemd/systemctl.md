systemctl enable gdm
systemctl start gdm


systemctl
  lista de unidades

systemctl list-unit-files
  muestra todos las unidades que existen en el sistema (/usr/lib/systemd/system/ and /etc/systemd/system/)
systemctl list-unit-files --type service
  ver que servicios están activados
  static: funciona como dependencia de otros services

systemctl list-units --all
  mostrar todas las unidades, cargadas o no
systemctl list-units --type service
systemctl disable rsyslog
systemctl enable rsyslog
  ln -s '/lib/systemd/system/rsyslog.service' '/etc/systemd/system/multi-user.target.wants/rsyslog.service'
systemctl reenable rsyslog
  regenera los enlaces aunque ya existan
systemctl mask rsyslog
  Previene que un usuario, u otro proceso, arranque rsyslog
  ln -s '/dev/null' '/etc/systemd/system/rsyslog.service'
  No los limita del arranque
systemctl unmask rsyslog

systemctl status
systemctl status proceso
  Los procesos se llaman: nombre.service
  nos dice script de inicio, desde cuando está activa, pid, cgroup, parámetros de ejecucción, ultimas trazas de log, etc.
  si está parada nos dice desde cuando, cual era su pid y con que return code salió
systemctl is-active httpd
systemctl is-enabled httpd
systemctl start gdm
systemctl reload gdm
  recargar configuración sin parar el proceso
systemctl reload-or-restart gdm
systemctl restart gdm
systemctl try-restart gdm
  reinicia el servicio solo si ya estaba corriendo
systemctl reload-or-try-restart gdm
systemctl stop rsyslog


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
