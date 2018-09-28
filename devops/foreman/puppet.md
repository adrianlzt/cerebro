https://theforeman.org/manuals/1.19/index.html#4.2ManagingPuppet

Si queremos aplicar clases a hosts generalmente haremos.

Bajarnos la clase en el puppet master, ejemplo:
puppet module install theforeman-dhcp --version 4.1.1

Importarla en foreman: Configure > Classes and click the Import butto

Luego podemos asignarlas directamente a hosts o asignarlas a Config groups, y estos a hosts.
O por medio de hostgroups.



Como configurar las clases (parametros)
https://theforeman.org/manuals/1.19/index.html#4.2.3Parameters

Lo más facil que he visto es ir a la clase, smart parameters, darle a override y luego en el host, darle a override y poner el valor que queramos.
