http://docs.ansible.com/ansible/latest/modules/raw_module.html

- name: Bootstrap a legacy python 2.4 host
  raw: yum -y install python-simplejson



Copiar ficheros sin python en el remoto:
- name: local scp — copy key file into authorized_keys 
  local_action: "command scp ../.ssh/user1_user.pub {{ansible_user}}@{{inventory_hostname}}:../{{user}}/.ssh/authorized_keys"
