https://kubernetes.io/docs/reference/access-authn-authz/authentication/

Se distinguen entre service accounts (manejadas por Kubernetes) y normal accounts (gestionadas por el admin del cluster).

Para las normal accounts tenemos varios métodos de auth, siendo el más típico certificado X509

# Admin
Podemos copiarnos el fichero /etc/kubernetes/admin.conf a nuestro ~/.kube/config para acceder como admin (mejor mergearlo con lo que ya tengamos)
Quitar la sección de cluster.certificate-authority-data si no estamos atacando a la IP registrada en el cert, y poner "insecure-skip-tls-verify: true"



# Gestion de certificados para usuarios
https://kubernetes.io/docs/concepts/cluster-administration/certificates/



https://docs.bitnami.com/kubernetes/how-to/configure-rbac-in-your-kubernetes-cluster/#use-case-1-create-user-with-limited-namespace-access
openssl genrsa -out adrian.key 2048
  generamos key para el user
openssl req -new -key adrian.key -out adrian.csr -subj "/CN=adrian"
  generamos CSR
openssl x509 -req -in adrian.csr -CA /etc/kubernetes/ssl/ca.pem -CAkey /etc/kubernetes/ssl/ca-key.pem -CAcreateserial -out adrian.pem -days 99999
  firmamos el cert
