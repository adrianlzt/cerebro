Herramientas varias sobre el arranque de systemd:

systemd-analyze blame
  ver tiempos de arranque de cada proceso

systemd-analyze plot >bootup.svg
  svg con el arranque de los distintos procesos puesto en una linea del tiempo

systemd-analyze dot
  grafico de dependencias de arranque
