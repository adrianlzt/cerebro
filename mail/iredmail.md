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
  dkim_key("midominio.com", "dkim", "/var/lib/dkim/midominio.com.pem");

amavisd -c /etc/amavisd/amavisd.conf showkeys
amavisd -c /etc/amavisd/amavisd.conf testkeys


# LDAP
Cuando se crea un usuario se hace una "addRequest" con:
entry: mail=test@domain.me,ou=Users,domainName=domain.me,o=domains,dc=domain,dc=us
Y una serie de parametros

Cuando se cambia la password de un usuario se hace una "modifyRequest" (pseudo formato):
object: mail=test@domain.me,ou=Users,domainName=domain.me,o=domains,dc=domain,dc=us
replace: userPassword: {SSHA}+H8Y96kHAtRTfjOQqy5/3j8kgJwg==
replace: shadowLastChange: 117507

Cuando un usuario quiere modificar su propia password se logeará contra ldap como si mismo.


# Errores
SELECT: Internal error occurred. Refer to server log for more information.
  problema de permisos. mirar journalctl
  Los directorios /var/vmail/vmail1/ tenian 5000:5000 pero dovecot estaba configurado para usar 2000:2000
