https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security-Enhanced_Linux/chap-Security-Enhanced_Linux-Confining_Users.html

Si al crear un usuario no especificamos nada se mapea contra __default__, y __default__ a su vez contra unconfined_u.
Los usuarios unconfined_u  corren en el dominio unconfined_t.
Podemos verlo con id -Z

El dominio unconfined_t da permisos para prácticamente todo.

Si un usuario ejecuta una aplicación con un dominio determinado, se hará una transición a ese dominio, por lo que la aplicación seguirá corriendo en el dominio confinado.

Pueden existir Linux users (del sistema) y SELinux users (generalmente se mapean los usuarios de sistema a usuarios de selinux)

Confined and unconfined Linux users are subject to executable and writeable memory checks, and are also restricted by MCS or MLS. (no pueden reservar memoria y ejecutar)

User        Domain    X Window System   su or sudo    Execute in home directory and /tmp/ (default)   Networking
sysadm_u    sysadm_t  yes               su and sudo   yes                                             yes
staff_u     staff_t   yes               only sudo     yes                                             yes
user_u      user_t    yes               no            yes                                             yes
guest_u     guest_t   no                no            no                                              yes
xguest_u    xguest_t  yes               no            no                                              Firefox only

No es que se limite sudo, los usuarios pueden seguir haciéndolo. Pero aunque hagan "sudo /bin/bash" seguirán en el dominio user_t por lo que solo podrá leer los ficheros de los dominios a los que tenga permisos (user_home_dir_t por ejemplo).
La diferencia sería si por ejemplo un fichero tiene 640 root:root y un dominio que permite leer a user_u.
Ese fichero el usuario user_u no lo podrá leer, pero si hace sudo cat si podrá leerlo.
Esto es porque primero se aplican las políticas DAC, que no permitirán el usuario sin sudo leer el fichero.


Crear usuario mapeado a un usuario de selinux
useradd -Z user_u useruuser

Mapear un usuario existente:
semanage login -a -s user_u newuser

Modificar el mapeo
semanage login -m -S targeted -s "user_u" -r s0 __default__
