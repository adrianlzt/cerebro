https://github.com/kelseyhightower/confd

Manage local application configuration files using templates and data from etcd

confd is a lightweight configuration management tool focused on:

keeping local configuration files up-to-date by polling etcd and processing template resources.
reloading applications to pick up new config file changes



Demonio que mantiene via etcd (cluster que mantiene pares clave-valor) ficheros de configuración. Y si se modifica alguno, chequea la nueva configuración y reinicia el demonio indicado.
