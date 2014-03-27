Por defecto: /etc/ansible/hosts

Podemos pasarlo por linea de comandos: ansible -i fichero ...

Aqui definimos los grupos de máquinas.
También podemos definir variables de esas máquinas.

# Sin grupo
maquina1.com
maquina2.host.com
192.168.3.2

[webservers]
www.machine.com
webserver.host.com

[mailserver]
smtp.host.com
pop3.host.com
mail.pepe.com


También podemos usar patterns:
www[001:006].example.com
db-[99:101]-node.example.com


Definiendo variables:
nombredelnodo ansible_sudo_pass='password' variable='valor'
