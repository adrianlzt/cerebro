Configuración activa:
fail2ban-client -d

Jails configuradas
fail2ban-client status

Detalle de una jail
fail2ban-client status NOMBRE
fail2ban-client get NOMBRE logpath
fail2ban-client get NOMBRE findtime
fail2ban-client get NOMBRE bantime
fail2ban-client get NOMBRE maxretry
fail2ban-client get NOMBRE actions

