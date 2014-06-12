https://github.com/kelseyhightower/confd

confd is a configuration management tool built on top of etcd. Confd can watch certain keys in etcd, and update the related configuration files as soon as the key changes. After that, confd can reload or restart applications related to the updated configuration files. This allows you to automate configuration changes to all the servers in your cluster, and makes sure all services are always looking at the latest configuration.


Parece una especie de pacemaker montado sobre un base de datos clave-valor distribuída.
