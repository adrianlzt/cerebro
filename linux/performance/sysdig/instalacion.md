Instalación automatica: 
curl -s https://s3.amazonaws.com/download.draios.com/stable/install-sysdig | sudo bash

Máquina vagrant:
https://github.com/adrianlzt/vagrant-ansible-sysdig


Instalacion manual centos:
rpm --import https://s3.amazonaws.com/download.draios.com/DRAIOS-GPG-KEY.public  
curl -s -o /etc/yum.repos.d/draios.repo http://download.draios.com/stable/rpm/draios.repo

Hace falta epel
rpm -i http://mirror.us.leaseweb.net/epel/6/i386/epel-release-6-8.noarch.rpm

yum install -y kernel-devel-$(uname -r)
yum install -y sysdig


Si nos dice:
error opening device /dev/sysdig0. Make sure you have root credentials and that the sysdig-probe module is loaded.

Ejecutar
sysdig-probe-loader

Parece que este programa, si no tenemos el módulo compilado lo intenta bajar ya compilado desde la web de sysdig
