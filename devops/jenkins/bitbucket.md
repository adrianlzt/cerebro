Si usamos bitbucket cloud, podemos usar el plugin Bitbucket Branch Source Plugin para escanear los proyectos y generar jobs automáticamente de los que tengan un Jenkinsfile.

https://support.cloudbees.com/hc/en-us/articles/115000051132-How-to-Trigger-Multibranch-Jobs-from-Bitbucket-Cloud-?page=49
Para poder crear los webhooks automáticamente necesitamos permisos suficientes (admin).
Solo los admin pueden crear los webhooks en los repos.
Mirar los logs de jenkins cuando se detecta un nuevo repo.
Si vemos "Could not register hooks for Bitbucket Organization Folder/prueba-webhook", es que no tenemos suficientes permisos.

Si no podemos hacer la conf automática, lo haremos a mano:
El endpoint a configurar en los webhooks de los jobs es:
$JENKINS_URL/bitbucket-scmsource-hook/notify

