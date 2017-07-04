https://docs.openshift.com/container-platform/3.5/dev_guide/secrets.html#dev-guide-secrets

Almacenados en etcd en base64
etcdctl2 get /kubernetes.io/secrets/namespace/nombre

Cuando se montan tambien los podemos ver en:
/var/lib/origin/openshift.local.volumes/pods/ID-POD/volumes/kubernetes.io~secret/NOMBRE
