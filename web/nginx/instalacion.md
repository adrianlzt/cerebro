http://nginx.org/en/linux_packages.html

## Ubuntu

Elegimos el ppa que queramos:
add-apt-repository ppa:nginx/stable
add-apt-repository ppa:nginx/development

apt-get update
apt-get install nginx

## CentOS
yum install -y http://nginx.org/packages/rhel/6/noarch/RPMS/nginx-release-rhel-6-0.el6.ngx.noarch.rpm
yum install nginx

## Centos 7
yum install -y http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
yum install nginx
