/etc/nginx/nginx.conf
...
http {
    ...
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/vhost.d/*.vhost;
}


/etc/nginx/vhost.d/icinga-classic.vhost
server {
    listen 80;
    server_name icinga.domain.com
    index index.php index.html index.htm;

    error_log /var/log/nginx/icinga-classic_error.log;

    include vhost.d/nginx.security.conf;
    include vhost.d/nginx.icinga.conf;

    location = / {
        rewrite ^/$ /icinga/index.html permanent;
    }
}
...

