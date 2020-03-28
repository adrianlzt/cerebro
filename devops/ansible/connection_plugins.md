ansible-doc -t connection -l
  ver lista

ansible-doc -t connection docker
  ver ayuda de un plugin concreto


# Docker
En el inventario pondremos el nombre del container y que use el plugin de docker
Los playbooks, como siempre.

inventory:
optimistic_blackwell ansible_connection=docker


No se puede usar containers parados.
