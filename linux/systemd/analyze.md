Herramientas varias sobre el arranque de systemd:

systemd-analyze blame
  ver tiempos de arranque de cada proceso

systemd-analyze plot >bootup.svg
  svg con el arranque de los distintos procesos puesto en una linea del tiempo

systemd-analyze dot | dot -Tsvg > /tmp/systemd.svg
  grafico de dependencias de arranque


sudo systemd-analyze verify default.target
  para chequear si tenemos una dependencia cíclica (cycle dependecy)

Ver datos de un servicio:
systemctl show -p Requires,Wants,Requisite,BindsTo,PartOf,Before,After NAME.service


Dependencias que requiere nuestra unidad:
systemctl list-dependencies sshd

Unidades que dependende de nuestra unidad:
systemctl list-dependencies --reverse sshd
