puppet agent -t --environment=pro

Tambien se puede definir el entorno en /etc/puppet/puppet.conf
[main]
   ...
   environment = pro
   ...

Asi podemos decirle al master que entorno queremos usar en el master.
