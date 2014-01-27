cat <<END > /var/www/html/index.html
> <html>
> <body>Master 01</body>
> </html>
> END

/etc/httpd/conf/httpd.conf:
<Location /server-status>  
    SetHandler server-status
    Order deny,allow
    Deny from all
    Allow from 127.0.0.1
</Location>


primitive apache WebSite ocf:heartbeat:apache \
params configfile="/etc/httpd/conf/httpd.conf" \
op monitor interval="1min"

Ordenar para que arranque antes la VIP que el apache
