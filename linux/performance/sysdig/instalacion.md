Instalación automatica: 
curl -s https://s3.amazonaws.com/download.draios.com/stable/install-sysdig | sudo bash

Máquina vagrant:
https://github.com/adrianlzt/vagrant-ansible-sysdig

# Arch
Necesita los headers del kernel

Si usamos kernel LTS:
sudo pacman -S linux-lts-headers

Si no
sudo pacman -S linux-headers

Al instalar las headers automaticamente se ejecutara dkms para compilar los modulos que sea necesario.

Si no habíamos instalado aun sysdig:
sudo pacman -S sysdig


# CentOS
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
sudo sysdig-probe-loader

Parece que este programa, si no tenemos el módulo compilado lo intenta bajar ya compilado desde la web de sysdig
