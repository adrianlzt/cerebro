https://www.percona.com/doc/kubernetes-operator-for-pxc/index.html
https://github.com/percona/percona-xtradb-cluster-operator/

Kubernetes operator para montar clusters de mariadb/xtradb cluster


git clone -b release-0.3.0 https://github.com/percona/percona-xtradb-cluster-operator
cd percona-xtradb-cluster-operator
kubectl apply -f deploy/crd.yaml
kubectl create namespace pxc
nkc pxc
kubectl apply -f deploy/rbac.yaml
kubectl apply -f deploy/operator.yaml

vi deploy/secrets.yaml
  generar passwords encriptadas en base64:
  echo -n 'plain-text-password' | base64

kc apply -f deploy/secrets.yaml
  cambiar nombre a los secrets

TLS: https://www.percona.com/doc/kubernetes-operator-for-pxc/TLS.html
deploy/cr.yaml/spec/pxc/allowUnstafeConfigurations true
  para desactivarlo (no recomendado)
  cambiar nombre a los secrets si los modificamos antes
  ajustar storage
  ajustar backup

kubectl apply -f deploy/cr.yaml


# Crear usuarios
https://www.percona.com/doc/kubernetes-operator-for-pxc/users.html

Tendremos que crearlos en la bbdd y luego darles acceso por el proxysql

GRANT ALL PRIVILEGES ON database1.* TO 'user1'@'%' IDENTIFIED BY 'password1';

kubectl exec -it some-name-pxc-proxysql-0 -- proxysql-admin --config-file=/etc/proxysql-admin.cnf --syncusers



# Errores

## Fallo interconexión entre nodos
Error de conexión entre los nodos.
Itento borrar los nodos para que se reconstruya.
El stateful set vuelve a crear los pods, empezando por el 0.
Como el 0 no fue el último en parar, no arranca el resto.

Idea:
 borrar el PerconaXtraDBCluster
 mover los pvc datadir para que el datadir-xxx-pxc-0 esté con el pv de arranque
 para esto borrar los pvc y crearlos forzadamente apuntando al PV que necesitamos
 crear de nuevo el PerconaXtraDBCluster
