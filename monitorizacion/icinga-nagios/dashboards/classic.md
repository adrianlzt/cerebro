http://docs.icinga.org/latest/en/configcgi.html

## ACCESO ##
/etc/icinga/cgi.conf

Variables para poder ver el estado de hosts y services
authorized_for_all_services=icingaadmin
authorized_for_all_hosts=icingaadmin
authorized_contactgroup_for_all_services=nombregrupo
authorized_contactgroup_for_all_hosts=nombregrupo

Lo más cómodo es definir un contact group (nombregrupo) y asignar los usuario a ese grupo


# NginX
https://wiki.icinga.org/display/howtos/Setting+up+Icinga+with+Nginx
https://github.com/Icinga/icinga-core/tree/master/contrib/nginx

Problemas para montarlo con nginx
http://monitoring-portal.org/wbb/index.php?page=Thread&postID=179842#post179842
  configurado para ssl, mirar en el github de icinga que estan las confs para http
http://www.server-world.info/en/note?os=CentOS_6&p=nginx&f=6



yum -y install spawn-fcgi fcgi-devel 
yum -y groupinstall "Development Tools"

wget https://codeload.github.com/gnosek/fcgiwrap/legacy.tar.gz/master -O fcgiwrap.tar.gz
tar zxvf fcgiwrap.tar.gz
cd gnosek-fcgiwrap-66e7b7d
autoreconf -i
./configure
make
make install

/etc/sysconfig/spawn-fcgi
FCGI_SOCKET=/var/run/fcgiwrap.sock
FCGI_PROGRAM=/usr/local/sbin/fcgiwrap
FCGI_USER=nginx
FCGI_GROUP=nginx
FCGI_EXTRA_OPTIONS="-M 0770"
OPTIONS="-u $FCGI_USER -g $FCGI_GROUP -s $FCGI_SOCKET -S $FCGI_EXTRA_OPTIONS -F 1 -P /var/run/spawn-fcgi.pid -- $FCGI_PROGRAM"


chkconfig spawn-fcgi on
chkconfig nginx on

mkdir /etc/nginx/vhost.d

chown nginx /etc/icinga/passwd

usermod -a -G icingacmd nginx

/etc/nginx/conf.d/icinga.conf 
# Icinga Classic - Configuration
server {
    listen       80 default_server;
    server_name  _;

    location /icinga {
        alias   /usr/share/icinga;
        index  index.html;
        auth_basic              "Icinga Access";
        auth_basic_user_file    /etc/icinga/passwd;
    }

    location ~ /icinga/(.*)\.cgi$ {
        root /usr/lib64/icinga/cgi;
        rewrite ^/icinga/cgi-bin/(.*)\.cgi /$1.cgi break;
        include /etc/nginx/fastcgi_params;
        fastcgi_pass  unix:/var/run/fcgiwrap.sock;
        fastcgi_index index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        auth_basic              "Icinga Access";
        auth_basic_user_file    /etc/icinga/passwd;
        fastcgi_param  AUTH_USER          $remote_user;
        fastcgi_param  REMOTE_USER        $remote_user;
    }

    # Security - Basic configuration
    location = /favicon.ico {
        log_not_found off;
        access_log off;
        expires max;
    }

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
    
}


service spawn-fcgi restart
service nginx restart


# Configuracion con virtualhost

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

/etc/nginx/vhost.d/nginx.icinga.conf 
# Icinga Classic - Configuration
    location /icinga {
        alias   /usr/share/icinga;
        index  index.html;
        auth_basic              "Icinga Access";
        auth_basic_user_file    /etc/icinga/passwd;
    }

    location ~ /icinga/(.*)\.cgi$ {
        root /usr/lib64/icinga/cgi;
        rewrite ^/icinga/cgi-bin/(.*)\.cgi /$1.cgi break;
        include /etc/nginx/fastcgi_params;
        fastcgi_pass  unix:/var/run/fcgiwrap.sock;
        fastcgi_index index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        auth_basic              "Icinga Access";
        auth_basic_user_file    /etc/icinga/passwd;
        fastcgi_param  AUTH_USER          $remote_user;
        fastcgi_param  REMOTE_USER        $remote_user;
    }

/etc/nginx/vhost.d/nginx.security.conf
# Security - Basic configuration
    location = /favicon.ico {
        log_not_found off;
        access_log off;
        expires max;
    }

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

