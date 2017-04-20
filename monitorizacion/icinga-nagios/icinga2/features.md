icinga2 feature list

Activar feature:
icinga2 feature enable api
ln -s /etc/icinga2/features-available/livestatus.conf /etc/icinga2/features-enabled/

Eliminar feature:
icinga2 feature disable api
rm /etc/icinga2/features-enabled/livestatus.conf

Tras añadir o borrar:
service icinga2 restart
systemctl restart icinga2
