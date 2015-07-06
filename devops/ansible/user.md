http://docs.ansible.com/user_module.html

- user: name=pepe
crea el user pepe, y su grupo primario pepe

- user: name=james shell=/bin/bash groups=admins,developers append=yes

# Le mete en el grupo haclient, además de los que ya pudiese tener
- name: add cyclops to hacluster so it could use pcs
  user: name=cyclops groups=haclient append=yes

- name: user to execute icinga checks via ssh
  user: name=cyclops-provisioner generate_ssh_key=yes ssh_key_bits=2048
# Genera .ssh/id_rsa y .ssh/id_rsa.pub

# Password
Meter tal como aparece en el shadow
password='$1$oZRMStM5$1YfqleGXUbcHm8YCDhpwV.'


Ejecutar tasks como otro usuario:
- name: checkout repo
  git: repo=https://github.com/some/repo.git version=master dest={{ dst }}
  sudo: yes
  sudo_user: some_user

# Ad-hoc
ansible -s maquina -m user -a "name=james shell=/bin/bash groups=admins,developers append=yes"

ansible localhost -m user -sa "name=pepe"
