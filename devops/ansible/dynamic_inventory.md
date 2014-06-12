http://docs.ansible.com/intro_dynamic_inventory.html

Parece que es como los backends de hiera. Para almacenar información en otros tipos de bases de datos.
Es como el fichero hosts pero a través de un script que accede a una BD

Ejemplo de usándolo con etcd.
https://unicornclouds.telegr.am/blog_posts/etcd_ansible_integration

Crean scripts que hacen queries y devuelven la información.
Apuntan 'hosts' y 'vars' a esos scripts y tienen la información dinámicamente
