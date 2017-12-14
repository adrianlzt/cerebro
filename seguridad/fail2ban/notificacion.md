Usaremos el action de envio de email que nos da información sobre la localización de la IP.
sendmail-geoip-lines

wget http://download.maxmind.com/download/geoip/database/asnum/GeoIPASNum.dat.gz
gunzip GeoIPASNum.dat.gz
mv GeoIPASNum.dat /usr/share/GeoIP/GeoIPASNum.dat
geoipupdate
ln -s /usr/bin/geoipupdate /etc/cron.daily/


Modificar /etc/fail2ban/action.d/sendmail-geoip-lines.conf
            City:`geoiplookup -f /usr/share/GeoIP/GeoLiteCity.dat "<ip>" | cut -d':' -f2-`


Agregar un action más al jail que queramos:
action      = iptables-multiport[name=dovecot, port="http,https,smtp,submission,pop3,pop3s,imap,imaps,sieve", protocol=tcp]
              sendmail-geoip-lines[name=Dovecot, dest=adrian@mail.com, sender=fail2ban@mail.com, sendername="Fail2Ban"]


Recargar la jail correspondiente
fail2ban-client reload dovecot-iredmail

Comprobar que se ha puesto el nuevo action:
fail2ban-client get dovecot-iredmail actions

