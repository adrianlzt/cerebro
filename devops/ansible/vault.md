http://docs.ansible.com/playbooks_vault.html

The vault feature can encrypt any structured data file used by Ansible. This can include “group_vars/” or “host_vars/” inventory variables, variables loaded by “include_vars” or “vars_files”, or variable files passed on the ansible-playbook command line with “-e @file.yml” or “-e @file.json”. Role variables and defaults are also included!

Crear fichero (nos pide contraseña):
ansible-vault create foo.yml

Si vamos a usar varios ficheros vault al mismo tiempo deben tener la misma contraseña.

Una vez puesta la contraseña nos abrirá vim para meter datos.
Podemos meter por ejemplo una variable:
variable: 1234

Ver fichero
ansible-vault view foo.yml

Para editar:
ansible-vault edit foo.yml

Cambiar contraseña:
ansible-vault rekey file1.yml file2.yml ...

Encriptar fichero yaml (coje un fichero desencriptado y lo encripta)
ansible-vault encrypt foo.yml bar.yml baz.yml

Desencriptar ficheros (coje un fichero encriptado y lo desencripta)
ansible-vault decrypt foo.yml bar.yml baz.yml


Para usarlo en un playbook:
ansible-playbook site.yml --ask-vault-pass
ansible-playbook site.yml --vault-password-file ~/.vault_pass.txt

Usar alias para no tener que escribir (VIEJO):
alias ansible='ansible --vault-password-file ~/.ansible.vault'
alias ansible-playbook='ansible-playbook --vault-password-file ~/.ansible.vault'
alias ansible-vault='ansible-vault --vault-password-file ~/.ansible.vault'

A partir de ansible 1.7:
~/.ansible.cfg
vault_password_file = ~/.ansible.vault

No funciona? https://github.com/ansible/ansible/pull/7649/files


## Ejemplo de uso con variable ##
- name: a play that runs entirely on the ansible host
  hosts: 127.0.0.1
  connection: local
  vars_files:
   - "foo.yml"
  gather_facts: false

  tasks:
  - uri: url=https://api.github.com/repos/adrianlzt/pruebas-assets/releases
         HEADER_Authorization="token {{github_token}}"
         dest=/tmp/otro/pruebas-assets/SALIDA
    register: releases

  - debug: msg='{{releases.json[0]["upload_url"]}}'

Lo ejecutaremos como:
ansible-playbook prueba.yaml --ask-vault-pass

Dentro de foo.yml
github_token: bdfklsdb4573bxc8sv87

