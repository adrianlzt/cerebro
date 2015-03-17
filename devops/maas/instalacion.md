maas - seed cloud setup, which includes both the region controller and the cluster controller below.
maas-region-controller - includes the web UI, API and database.
maas-cluster-controller - controls a group (“cluster”) of nodes including DHCP management.
maas-dhcp/maas-dns - required when managing dhcp/dns.

Ubuntu Server 12.04 LTS is what is recommended for enterprise deployments (http://linux.dell.com/files/whitepapers/Deploying_Workloads_With_Juju_And_MAAS.pdf)

Las recomendaciones son 4GB de RAM.
Con 512MB falla. Pruebo 2GB.

Script para automatizar la instalación:
https://github.com/gabriel-samfira/maas-hacks/blob/master/automation/deploy_maas.sh

# Instalacion
sudo apt-get update


sudo apt-get install python-software-properties
sudo add-apt-repository ppa:maas-maintainers/stable
sudo apt-get update

Otros repos:
    Versiones más nuevas para Precise:
      sudo add-apt-repository cloud-archive:tools
    Para test build:
      sudo apt-add-repository ppa:maas-maintainers/testing
    Para daily builds:
      sudo apt-add-repository ppa:maas-maintainers/dailybuilds
  
    sudo apt-get update


# Instalacion

## Instalacion region controller
apt-get install maas-region-controller

## Instalacion cluster controller
apt-get install maas-cluster-controller maas-dns

apt-get install wakeonlan
  si vamos a usar wakeonlan


## Instalar todo en el mismo servidor (si no, tendremos que distinguir entre maas-cluster-controller y maas-region-controller)
sudo apt-get install maas
  como servidor de dns instala bind9
    /etc/init.d/bind9
    conf en /etc/bind/maas
  como servidor dhcp instala isc-dhcp-server
    se arranca con la conf en /etc/maas/dhcpd.conf
    en principio desactivado

apt-get install wakeonlan
  si vamos a usar wakeonlan

Mirar configuracion.md
