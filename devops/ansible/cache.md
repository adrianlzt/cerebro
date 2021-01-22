https://docs.ansible.com/ansible/latest/plugins/cache.html
Cachear facts


Podemos cachear los facts durante determinado tiempo para acelerar los despliegues
https://docs.ansible.com/ansible/latest/plugins/cache.html

Una configuración simple:
Meter en el .envrc del directorio:
export ANSIBLE_CACHE_PLUGIN=jsonfile
export ANSIBLE_CACHE_PLUGIN_CONNECTION=$PWD/.cache
export ANSIBLE_GATHERING=smart

Y crear el dir:
mkdir .cache


# Con redis
Podemos usar facts caching (version >= 1.8) para almacenar estos valores entre ejecuciones
http://docs.ansible.com/playbooks_variables.html#fact-caching
sudo apt-get install redis-server
sudo pip install redis
  esto es para tener la ultima libreria python para redis

~/.ansible.cfg
[defaults]
fact_caching = redis
fact_caching_timeout = 86400
# in seconds
fact_caching_connection = localhost:6379:0

Ahora si ejecutamos un playbook, los facts se almacenarán en la redis.
