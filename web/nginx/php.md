# CentOS
https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-centos-7

yum install -y php-fpm
systemctl enable php-fpm
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

