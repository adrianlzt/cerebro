De esta forma no tenemos que conocer la arquitectura de la máquina ni la versión de EPEL disponible.

- name: bootstrap epel-release install
  copy: src=ansible-bootstrap-epel.repo
        dest=/etc/yum.repos.d/
        owner=root group=root mode=0644

- name: epel-release install
  yum: name=epel-release
       enablerepo=ansible-bootstrap-epel
       state=present

- name: epel repository enable
  ini_file: dest=/etc/yum.repos.d/epel.repo
            section=epel
            option=enabled
            value=1

files/ansible-bootstrap-epel.repo
[ansible-bootstrap-epel]
name = Ansible bootstrap for epel
mirrorlist = http://mirrors.fedoraproject.org/mirrorlist?repo=epel-$releasever&arch=$basearch
failovermethod = priority
enabled = 0
gpgcheck = 0



Otra forma más básica:
- name: Enable Epel for RedHat OS family
  yum: name=http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm state=present
