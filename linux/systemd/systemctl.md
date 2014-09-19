systemctl enable gdm
systemctl start gdm


systemctl
  lista de servicios
systemctl status
systemctl status proceso
  Los procesos se llaman: nombre.service
  nos dice script de inicio, desde cuando está activa, pid, cgroup, parámetros de ejecucción, ultimas trazas de log, etc.
  si está parada nos dice desde cuando, cual era su pid y con que return code salió
systemctl start gdm
systemctl stop rsyslog
systemctl disable rsyslog
systemctl enable rsyslog
  ln -s '/lib/systemd/system/rsyslog.service' '/etc/systemd/system/multi-user.target.wants/rsyslog.service'

systemctl show
  mostrar variables

systemctl show -p Architecture
  mostrar una variable en particular
