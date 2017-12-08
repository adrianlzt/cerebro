Servicio que te instala diferentes programas por debajo para tener un servidor de correo entrante/saliente, webmail, calendario, etc.

La versión de pago ofrece más caractersiticas.

dovecot -> imap, ...
smapassasin
roundcube, sogo -> webmail
fail2ban -> limitar número de intentos de login
openldap -> gestión de usuarios
postfix -> envio/recepción de emails

El logueo de los usuarios se hace con nombre@dominio.com

# Install
Bajamos un .tar.bz2 y ejecutamos el script de instalación:
mkdir -p /var/log/dovecot /etc/fail2ban/filter.d
  intenta crear ficheros de log dentro de ese dir, pero el rpm no genera ese dir
bash iRedMail.sh

Log de la instalación:
runtime/install.log

fail2ban en centos no tiene estos ficheros de conf:
/etc/fail2ban/fail2ban.conf
/etc/fail2ban/jail.conf
iRedMail falla al intentar configurarlo

Falla al intentar actualizar las databases de clamav.
A mano:
chown -R clamupdate:virusgroup /var/lib/clamav
freshclam

Tras la instalación chequear que todos los servicios están arrancados:
systemctl list-units --type=service


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


# Usuarios
Deshabilitar cambio de contraseña

En sogo:
$ grep SOGoPasswo /etc/sogo/sogo.conf
    SOGoPasswordChangeEnabled = NO;

En roundcube (no he visto forma de modificar unicamente el config.inc.php general, el del plugin parece tener prioridad siempre):
/var/www/roundcubemail-1.3.0/plugins/password/config.inc.php
$config['password_disabled'] = 'Not allowed';


En la interfaz admin no se pueden logar los usuarios normales



# Borrar
for i in postfix slapd mariadb nginx php-fpm uwsgi dovecot clamd@amavisd amavisd sogod memcached fail2ban iredapd; do systemctl stop $i; done
for i in postfix slapd mariadb nginx php-fpm uwsgi dovecot clamd@amavisd amavisd sogod memcached fail2ban iredapd; do systemctl disable $i; done
yum erase -y postfix openldap-servers mariadb-server nginx php-fpm dovecot dovecot-pigeonhole dovecot-mysql dovecot-pgsql amavisd-new spamassassin clamav clamav-update clamav-server clamav-server-systemd  sogo sogo-activesync sogo-ealarms-notify sogo-tool uwsgi uwsgi-plugin-python awstats fail2ban  logwatch
rm -fr /etc/postfix/ /etc/my.cnf* /etc/nginx/ /etc/php-fpm.d /etc/dovecot/ /etc/clamd.d/ /etc/amavisd/ /etc/sogo/ /etc/fail2ban/ /var/lib/mysql/ /var/lib/dovecot/ /var/lib/clamav/ /var/lib/sogo/ /var/lib/fail2ban/ /var/log/dovecot  /var/log/iredapd/ /var/log/uwsgi/ /var/vmail /var/www/roundcubemail* /var/www/awstats-statistics /var/www/iredadmin /var/www/iRedAdmin-0.8/ /opt/iredapd /opt/iRedAPD-2.1 /usr/local/bin/dovecot-quota-warning.sh* /etc/systemd/system/multi-user.target.wants//iredapd.service /var/lib/clamav/ /etc/mail/ /etc/sysconfig/sogo* /root/.my.cnf*


# Errores
SELECT: Internal error occurred. Refer to server log for more information.
  problema de permisos. mirar journalctl
  Los directorios /var/vmail/vmail1/ tenian 5000:5000 pero dovecot estaba configurado para usar 2000:2000
