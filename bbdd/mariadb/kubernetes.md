https://www.percona.com/doc/kubernetes-operator-for-pxc/index.html

Kubernetes operator para montar clusters de mariadb/xtradb cluster


git clone -b release-0.3.0 https://github.com/percona/percona-xtradb-cluster-operator
cd percona-xtradb-cluster-operator
kubectl apply -f deploy/crd.yaml\n
kubectl create namespace pxc
nkc pxc
kubectl apply -f deploy/rbac.yaml
kubectl apply -f deploy/operator.yaml

vi deploy/secrets.yaml
  generar passwords encriptadas en base64:
  echo -n 'plain-text-password' | base64

kc apply -f deploy/secrets.yaml

TLS: https://www.percona.com/doc/kubernetes-operator-for-pxc/TLS.html
deploy/cr.yaml/spec/pxc/allowUnstafeConfigurations true
  para desactivarlo (no recomendado)

kubectl apply -f deploy/cr.yaml
