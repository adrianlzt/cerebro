http://cloudinit.readthedocs.org/en/latest/
http://bazaar.launchpad.net/~cloud-init-dev/cloud-init/trunk/files/head:/doc/examples/

Everything about cloud-init, a set of python scripts and utilities to make your cloud images be all they can be!
Cloud-init is the defacto multi-distribution package that handles early initialization of a cloud instance.

Scripts que se pasan a una máquina recién creada para realizar funciones básicas: 
  definir el locale
  definir hostname
  generar keys ssh
  añadir usuarios para acceso por key
  definir puntos de montaje temporales


La idea es que la imagen que arranca tenga cloud-init, realice todos los procesos del punto anterior, y pueda tambien ejecutar scripts personalizados.
De esta manera, sin tener que entrar por consola a la máquina, tendríamos una VM virtual con acceso por ssh.

Se puede ver como un puppet minimalista para máquinas virtuales.
Se pueden crear usuarios, grupos, repositorios, dns, instalar puppet, etc
http://cloudinit.readthedocs.org/en/latest/topics/examples.html
