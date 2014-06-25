http://linuxdash.com/

A simple web dashboard to monitor your linux server.

Instalar nginx

Descargar linux-dash en
/usr/share/nginx/html/linux-dash

Requisitos:
apt-get install php5-curl php5-fpm

Crear configuración nginx https://gist.github.com/sergeifilippov/8909839
/etc/nginx/sites-available/linuxdash
server {
    server_name     localhost;
    root            /usr/share/nginx/html/;
    index           index.html index.php;
    access_log      /var/log/nginx/access.log;
    error_log       /var/log/nginx/error.log;

    # Cache static files for as long as possible
    location ~* \.(?:xml|ogg|mp3|mp4|ogv|svg|svgz|eot|otf|woff|ttf|css|js|jpg|jpeg|gif|png|ico)$ {
            try_files $uri =404;
            expires max;
            access_log off;
            add_header Pragma public;
            add_header Cache-Control "public, must-revalidate, proxy-revalidate";
    }

    # if hosting in a sub folder, setup a new location
    # replace `/linux-dash` with the folder name eg. `/folder_name`
    location /linux-dash {
        index index.html index.php;
    }

    # Pass PHP requests on to PHP-FPM using sockets
    location ~ \.php(/|$) {
            fastcgi_split_path_info ^(.+?\.php)(/.*)$;
            fastcgi_pass unix:/run/php5-fpm.sock;
            # fastcgi_pass   localhost:9000; # using TCP/IP stack
            if (!-f $document_root$fastcgi_script_name) {
                    return 404;
            }
            try_files $uri $uri/ /index.php?$args;
            include fastcgi_params;
    }
}

Modificar configuración fpm para que pueda nginx conectar a fpm:
/etc/php5/fpm/pool.d/www.conf
listen.owner = www-data
listen.group = www-data
listen.mode = 0660

