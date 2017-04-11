# CentOS
https://www.nginx.com/resources/wiki/start/topics/examples/phpfcgi/
https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-centos-7

yum install -y php-fpm
systemctl enable php-fpm

Ejemplo de fichero en php.conf (ejemplo completo, los de abajo pueden que les falte algo)

## Conectando via TCP
No modifico /etc/php-fpm.d/www.conf
No modifico /etc/php.ini (no me queda claro si hace falta cambiar cgi.fix_pathinfo)
Entiendo que si en nginx usamos fastcgi_param SCRIPT_FILENAME debemos dejar el default (1)
systemctl start php-fpm

        location ~ [^/]\.php(/|$) {
            fastcgi_split_path_info ^(.+?\.php)(/.*)$;
            if (!-f $document_root$fastcgi_script_name) {
                return 404;
            }

            # Mitigate https://httpoxy.org/ vulnerabilities
            fastcgi_param HTTP_PROXY "";

            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            include fastcgi_params;
        }



## Con unix socket
vi /etc/php-fpm.d/www.conf
  cambiar el listen a un socket:
  ;listen = 127.0.0.1:9000
  listen = /var/run/php-fpm/php-fpm.sock
  listen.owner = nobody
  listen.group = nobody
  user = nginx
  group = nginx

vi /etc/php.ini
cgi.fix_pathinfo=0
  quitar comentario

systemctl start php-fpm

Al fichero de conf de nginx, agregar:

		index index.php index.html index.htm;

    location ~ \.php$ {
        include /etc/nginx/fastcgi_params;
        fastcgi_pass  unix:/var/run/php-fpm/php-fpm.sock;
    }

    location ~ /\.ht { 
        deny all;
    }

