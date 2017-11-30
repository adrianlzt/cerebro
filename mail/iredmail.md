Servicio que te instala diferentes programas por debajo para tener un servidor de correo entrante/saliente, webmail, calendario, etc.

La versión de pago ofrece más caractersiticas.



# Errores
SELECT: Internal error occurred. Refer to server log for more information.
  problema de permisos. mirar journalctl
  Los directorios /var/vmail/vmail1/ tenian 5000:5000 pero dovecot estaba configurado para usar 2000:2000
