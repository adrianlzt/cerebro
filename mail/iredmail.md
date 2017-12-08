Servicio que te instala diferentes programas por debajo para tener un servidor de correo entrante/saliente, webmail, calendario, etc.

La versión de pago ofrece más caractersiticas.

dovecot -> imap, ...

El logueo de los usuarios se hace con nombre@dominio.com

# DKIM
Si agregamos nuevos dominios tenemos que agregar a mano la clave DKIM
https://www.faqforge.com/linux/how-to-enable-dkim-email-signatures-in-amavisd-new-and-ispconfig-3/
amavisd genrsa /var/lib/dkim/midominio.com.pem
chown amavis:amavis /var/lib/dkim/midominio.com.pem
vi /etc/amavisd/amavisd.conf
  dkim_key("live2sync.me", "dkim", "/var/lib/dkim/live2sync.me.pem");

amavisd -c /etc/amavisd/amavisd.conf showkeys
amavisd -c /etc/amavisd/amavisd.conf testkeys


# Errores
SELECT: Internal error occurred. Refer to server log for more information.
  problema de permisos. mirar journalctl
  Los directorios /var/vmail/vmail1/ tenian 5000:5000 pero dovecot estaba configurado para usar 2000:2000
