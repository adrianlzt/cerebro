Info del video: http://www.stackgeek.com/blog/kordless/post/taking-openstack-for-a-spin

Una vez desplegado openstack con devstack entramos en Horizon como admin.
Para un correcto despliegue el host openstack tiene que estar con network public, para que tenga asignada una ip de la red local. Las instancias que se creen también estarán conectadas a esta red local.

Creamos las claves que se inyectaran en las máquinas: Acceso y seguridad -> Par de claves ->  Crear par de claves -> default -> descargar default.pem

Ahora conseguiremos una ip pública para la instancia que creamos: Acceso y seguridad -> ip flotantes -> asignar ip al proyecto -> depósito public (?) -> asignar ip

Agregamos las reglas de firewall: Acc y Seg -> Grupos de seguridad -> Editamos default -> Lo normal es permitir acceso desde nuestra red local
  SSH  192.168.1.0/24
  HTTP 192.168.1.0/24
  ICMP 192.168.1.0/24


Ahora vamos a lanzar una instancia. Para ello vamos a Imágenes e Instantáneas, y pinchamos sobre lanzar en la imagen cirros. Definimos
  availability zone: nova (la que hay)
  nombre: test
  sabor: micro (1vcpu, 128RAM, 0 discos)
  Boot source: boot from image
  Imagen: cirros
  Acceso y Seguridad
    par de claves: default
    admin pass: root
    Grupo de seguridad: default
  Pos-creación: aquí podemos ejecutar un script en el arranque de la máquina. Debemos definir el intérprete:
    #!/bin/bash
    echo "script personalizado"
    id
    uname -a
    echo "fin script"

Arrancar!
Le asigna la ip interna 10.99.0.2

Mediante el menu "Más" de la derecha le asocio la ip flotante que habíamos creado. De manera que ahora tiene la ip privada, y una pública, pertenciente al rango de mi red local: 192.168.1.226.
Al hacerlo de esta manera he creado una nueva ip flotante. Para asociar la que había creado al principio tengo que hacerlo desde el menu de ips flotantes.

Si pinchamos sobre el nombre de la instancia podremos ver información sobre ella más detallada, el log de su ejecución, y acceso a su consola.
La consola es un vnc con interfaz web

Ahora conecto a la instancia desde un terminal de mi portatil:
chmod 0600 default.pem
ssh -i default.pem cirros@192.168.1.226  (sin password)
ssh cirros@192.168.1.226  (con password: "cubswin:)" )
  
