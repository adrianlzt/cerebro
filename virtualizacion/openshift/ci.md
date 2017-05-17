Se puede hacer que OpenShift actue de CI.
Podemos configurar un webhook en Github que ataque a Openshift para automatizar el build de una imagen y su despliegue cuando se produzca algún cambio en el repo.
Ejemplo de endpoint que se configuraría en github:
https://192.168.99.101:8443/oapi/v1/namespaces/myproject/buildconfigs/django-psql-persistent/webhooks/G0HsEKPW4gSgdycKLoVC4vbb2CKgLIfFrtH3Fbia/github
