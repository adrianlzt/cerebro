http://docs.ansible.com/synchronize_module.html

Copiar ficheros en la misma máquina con rsync. Hace falta que el usuario pueda conectarse por ssh a si mismo.

- name: allow cyclops user to access as cyclops-provision user via ssh (priv key)
  synchronize: src=/home/cyclops-provisioner/.ssh/id_rsa
               dest=/home/cyclops/.ssh/id_rsa
               owner=cyclops group=cyclops
  delegate_to: "{{ inventory_hostname }}"



Copiar directorio recursivamente manteniendo permisos y usuarios (es necesario tener 'sudo: true' para poder mantener los usuarios):
- synchronize: src=/tmp/prueba dest=/tmp/otra owner=yes


Copiando entre dos maquinas remotas
- hosts: hostA
  sudo: True
  gather_facts: False
  tasks:
    - name: copiamos del hostA a hostB
      synchronize: mode=pull src=/tmp/check_mk.tar dest=/tmp/check_mk.tar
      sudo_user: skypebot
      delegate_to: hostB

