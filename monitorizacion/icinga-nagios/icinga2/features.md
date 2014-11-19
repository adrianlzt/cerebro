Activas:
ls /etc/icinga2/features-enabled

Disponibles:
ls /etc/icinga2/features-available

Activar feature:
ln -s /etc/icinga2/features-available/livestatus.conf /etc/icinga2/features-enabled/

Eliminar feature:
rm /etc/icinga2/features-enabled/livestatus.conf

Tras añadir o borrar:
service icinga2 restart
systemctl restart icinga2
