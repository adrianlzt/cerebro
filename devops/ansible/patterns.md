http://docs.ansible.com/intro_patterns.html

webser*

Afecta a todos los webservers y todos los ftpservers
webserver:ftpserver

Tiene que cumplir ambas cosas. Solo afecta a los webservers de españa
webserver:&spain

Todos los hosts del grupo dsmc-pre salvo host5.inet
- hosts: dsmc-pre:!host5.inet

Todos los hosts del grupo salvo esos dos
- hosts: dsmc-pre:!host.inet:!host6.inet


ansible server1*prod* -m ping
