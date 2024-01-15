docker run --rm -it --net host webdevops/postfix
Expone el puerto :25 en localhost

Modificar main.cf
mynetworks = 0.0.0.0/0
inet_interfaces = all
