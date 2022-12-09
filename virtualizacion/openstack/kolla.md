Despliegue de OST usando ansible.

En la tag de los contenedores podemos ver la release que usamos.
Ejemplo: kolla/ubuntu-binary-kolla-toolbox:ussuri


Logs
/var/log/kolla


# Logging
https://docs.openstack.org/kolla-ansible/latest/reference/logging-and-monitoring/central-logging-guide.html
Despliega un Elasticsearch+Kibana para poder analizar todos los logs que se generan.

Usa fluentd para enviar los logs.

Index pattern - flog-*


# admin / cli
docker exec -it kolla_toolbox bash
Pensé que tendría la cli "openstack" ya lista, pero me pide credenciales.
