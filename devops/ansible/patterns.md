http://docs.ansible.com/intro_patterns.html

webser*

Afecta a todos los webservers y todos los ftpservers
webserver:ftpserver

Tiene que cumplir ambas cosas. Solo afecta a los webservers de españa
webserver:&spain

Todos los hosts del grupo dsmc-pre salvo ESJC-DSMM-MS05S.om-s.dsn.inet
- hosts: dsmc-pre:!ESJC-DSMM-MS05S.om-s.dsn.inet

Todos los hosts del grupo salvo esos dos
- hosts: dsmc-pre:!ESJC-DSMM-MS05S.om-s.dsn.inet:!ESJC-DSMM-MS06S.om-s.dsn.inet

