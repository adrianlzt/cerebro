Configurar status en nginx
Mirar web/nginx/status.md


LoadPlugin nginx
<Plugin nginx>
        URL "http://localhost:8000/status?auto"
#       User "www-user" 
#       Password "secret"
#       CACert "/etc/ssl/ca.crt"
</Plugin>


