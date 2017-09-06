WARNING: Image "myproject/nginx:latest" runs as the 'root' user which may not be permitted by your cluster administrator
Mirar seguridad.md



Un ReplicationController está en estado Failed y queremos que vuelva a intentar:
oc describe rc/nginx-php-fpm-1
  en los eventos veremos que tiene 0 replicas

Ver el nombre del replicacontroller:
oc get rc

Arrancar de nuevo el rc:
oc scale --replicas=1 rc/nginx-php-fpm-1



fit failure summary on nodes : CheckServiceAffinity (5), MatchNodeSelector (5); retrying
Mirar el NodeSelector que matchee. Mirar a nivel global, de prouyecto, de DC o de template.
