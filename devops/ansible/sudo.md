http://docs.ansible.com/ansible/become.html

# Ansible 2.0
sudo -> become
sudo_user -> becomse_user


become: True

Podemos configurar un playbook para que siempre use sudo

  sudo: True
  ###########
  # Playbook attribute: sudo
  # Default: False
  # Required: no
  # Description:
  #   If True, always use sudo to run this playbook, just like passing the
  #   --sudo (or -s) flag to ansible or ansible-playbook.

Si no le pasamos la password (fichero hosts) o le decimos que nos la pida (-K) se quedará parada la ejecucción.


En el inventario de máquinas podemos definir la contraseña de sudo a utilizar:
some-host ansible_sudo_pass='foobar'


Si queremos no tener la password en el fichero de hosts podemos hacer que la pregunte en el prompt:
ansible-playbook prueba.yaml -K

Si queremos pasarlo en la línea de comandos (cuidado con caracteres especiales, habrá que escaparlos):
ansible-playbook prueba.yaml -e "ansible_sudo_pass=PASSWORD"

Parece que no hay forma de definir en el playbook que nos pregunte por la password para sudo, tenemos que decirlo en el CLI con -K


## Encriptar la password de sudo con vault y aplicandola a un grupo de hosts ##
Suponemos que tenemos en el fichero hosts un grupo de máquinas, webserver, que comparten todas la misma password de sudo.
Una opción es poner a cada una de las máquinas la línea ansible_sudo_pass='foobar'.
Otra opción es al final del fichero definir:
[webserver:vars]
ansible_sudo_pass='foobar'

Y la opción buena es crear en nuestro directorio root de ansible el directorio:
group_vars/
Y ahí dentro crear el fichero webserver
Dentro de él definimos la password:
ansible_sudo_pass: 'foobar'

Para terminar lo encriptamos:
ansible-vault encrypt group_vars/webserver

Así ya podremos ejecutar nuestros playbooks o ad-hocs sin tener que escribir la password de root.
No olvidarnos de poner
--ask-vault-pass
o
--vault-password-file ~/.vault_pass.txt


También podemos hacerlo con ansible_ssh_pass


# Definir ficheros en sudoers.d/
- name: sudo, allow cyclops-provision restart icinga
  copy: src=cyclops_restart_icinga.sudo
        dest=/etc/sudoers.d/cyclops_restart_icinga
        validate='visudo -cf %s'
        owner=root group=root mode=0440


