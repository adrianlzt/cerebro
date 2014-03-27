http://docs.ansible.com/setup_module.html

Esto es como los facts de puppet:
ansible all -m setup

Nos devuelve todas las varibables que luego podremos usar en los plays.

También nos devuelve las variables del propio facter (si está instalado):
facter_*


Para obtener un fact en particular:
ansible nagiosmasterprepro01 -m setup -a filter=ansible_all_ipv4_addresses

The filter option filters only the first level subkey below ansible_facts.

