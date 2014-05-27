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
