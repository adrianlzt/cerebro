Ejecuta "apt-get update" y luego instala el paquete "maas"
- name: install maas
  apt: name=maas state=present update_cache=yes


# Repositorios

http://docs.ansible.com/apt_repository_module.html

apt_repository: repo='ppa:nginx/stable'

apt_repository: repo='deb http://archive.canonical.com/ubuntu hardy partner' state=present

