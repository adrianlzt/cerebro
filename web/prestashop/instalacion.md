Bajar de https://www.prestashop.com

# Instalar
http://doc.prestashop.com/display/PS16/Installing+PrestaShop?utm_source=html_installer

Requisitos:
RedHat 7, hace falta epel y remirepos:
rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
rpm -Uvh http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-8.noarch.rpm

yum install -y nginx mariadb-server php71-php-fpm php71-php-pecl-zip php71-php-xml.x86_64 php71-php-mysqlnd.x86_64 php71-php-pecl-crypto.x86_64 php71-php-pecl-mysql.x86_64 php71-php-soap.x86_64

Crear una base de datos:
systemctl start mariadb
systemctl enable mariadb
mariadb> create database presta;
mariadb> CREATE USER 'presta'@'localhost' IDENTIFIED BY 'pass123';
mariadb> GRANT ALL ON presta.* TO 'presta';


systemctl enable php71-php-fpm
systemctl start php71-php-fpm
systemctl enable nginx
systemctl start nginx

vi /etc/opt/remi/php71/php-fpm.d/www.conf

/etc/nginx/conf.d/presta.conf
server {
    server_name _;
    access_log /var/www/html/presta/logs/access.log;
    error_log /var/www/html/presta/logs/error.log;
    root /var/www/html/presta/public_html;

    location / {
        index index.html index.htm index.php;
    }

    location ~ \.php$ {
        include /etc/nginx/fastcgi_params;
        fastcgi_pass  127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}

Comentar el server por defecto en nginx.conf
mkdir -p /var/www/html/presta/{public_html,logs}




Poner instalador en el nginx:
Descomprimir el .zip en /var/www/html/presta/public_html
Descomprimir tambien el prestashop.zip

php install/index_cli.php
