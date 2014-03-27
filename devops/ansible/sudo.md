Podemos configurar un playbook para que siempre use sudo

  sudo: True
  ###########
  # Playbook attribute: sudo
  # Default: False
  # Required: no
  # Description:
  #   If True, always use sudo to run this playbook, just like passing the
  #   --sudo (or -s) flag to ansible or ansible-playbook.


En el inventario de máquinas podemos definir la contraseña de sudo a utilizar:
some-host ansible_sudo_pass='foobar'
