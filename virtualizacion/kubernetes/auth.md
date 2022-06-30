mirar rbac.md

# Klum
https://github.com/ibuildthecloud/klum

Operator para gestionar usuarios.
Solo tenemos que definir un objeto con el usuario y los permisos y nos permite descargar el kubecfg.

Install:
kubectl apply -f https://raw.githubusercontent.com/ibuildthecloud/klum/master/deploy.yaml

Crear usuario
cat <<EOF | kubectl apply -f -
kind: User
apiVersion: klum.cattle.io/v1alpha1
metadata:
  name: darren
EOF

Si no especificamos roles, por defecto el usuario será cluster-admin.

Podemos dar, por ejemplo, rol de admin por namespace.

Bajar fichero de config:
kubectl get kubeconfig darren -o json | jq .spec > kubeconfig
kubectl --kubeconfig=kubeconfig get all


Parar desactivar el usuario:
``````
spec:
  enabled: false
``````



# Teoria
https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/
https://kubernetes.io/docs/reference/access-authn-authz/authentication/

Se distinguen entre service accounts (manejadas por Kubernetes) y normal accounts (gestionadas por el admin del cluster).


Las service accounts pertenecen a un namespace y están pensadas para los pods o llamadas programáticas de otra app.

Para las normal accounts tenemos varios métodos de auth, siendo el más típico certificado X509
Parece que openshift usa tokens.


Authentication: permitir acceso al cluster
Authorization: roles/bindings para permitir acceso al usuario a distintos objetos



# Authentication
Podemos tener varios authorizers. El primero que cumpla dejará pasar al cluster la petición.

Mainstream authentication modules include
  client certificates
  password
    --basic-auth-file=SOMEFILE en el api server
    no usar (método legacy mientras se implementan otros mejores)
    se usa http basic auth
  plain tokens
  bootstrap tokens
    simple bearer token that is meant to be used when creating new clusters or joining new nodes to an existing cluster
    https://kubernetes.io/docs/reference/access-authn-authz/bootstrap-tokens/
  JWT tokens (used for service accounts)

Generalmente tendremos tokes para las service accounts y certificados para los usuarios.


## Token
Las service accounts pueden autenticarse usando un token (con el header Authorization: Bearer $TOKEN)

## Admin
Podemos copiarnos el fichero /etc/kubernetes/admin.conf a nuestro ~/.kube/config para acceder como admin (mejor mergearlo con lo que ya tengamos)
Quitar la sección de cluster.certificate-authority-data si no estamos atacando a la IP registrada en el cert, y poner "insecure-skip-tls-verify: true"



## Gestion de certificados para usuarios
https://kubernetes.io/docs/concepts/cluster-administration/certificates/

https://www.linkedin.com/pulse/adding-users-quick-start-kubernetes-aws-jakub-scholz



https://docs.bitnami.com/kubernetes/how-to/configure-rbac-in-your-kubernetes-cluster/#use-case-1-create-user-with-limited-namespace-access
openssl genrsa -out adrian.key 2048
  generamos key para el user
openssl req -new -key adrian.key -out adrian.csr -subj "/CN=adrian"
  generamos CSR
openssl x509 -req -in adrian.csr -CA /etc/kubernetes/ssl/ca.pem -CAkey /etc/kubernetes/ssl/ca-key.pem -CAcreateserial -out adrian.pem -days 99999
  firmamos el cert



Pasamos al cliente el cert y la key, y en su pc debe hacer:
kubectl config set-cluster demo --insecure-skip-tls-verify=true --server=https://1.2.3.4:6443
kubectl config set-credentials adrian --client-certificate=adrian.pem --client-key=adrian.key
kubectl config set-context demo-adrian --cluster=demo --namespace=default --user=adrian
  los "context" relacionan un cluster, un usuario y un namespace

Nos falta asociar (RoleBinding) el usuario (User) a un rol (Role) (que sería authorization)





# Authorization / Roles
Los namespaces no tienen roles por defecto.

Los roles los tenemos de dos tipos, clusterrole o role a secas.
Los clusterroles están definidos para todo el cluster y se pueden usar para dar permisos globales, o para dar esos permisos en un determinado namespace.
Los roles se tienen que definir dentro de un namespace siempre, y solo podrán asignarse en ese namespace

Si queremos crear un rol custom:

kind: Role
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  namespace: office
  name: deployment-manager
rules:
- apiGroups: ["", "extensions", "apps"]
  resources: ["deployments", "replicasets", "pods"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"] # You can also use ["*"]


kubectl create -f role-deployment-manager.yaml


Podemos asociarle uno de los roles ya existentes (los que no empiecen por "system:"):
kubectl get clusterroles

cluster-admin -> super role
cluster-* -> que aplican a todos los namespaces
admin/edit/view -> pensados para proveer esos permisos en uno o varios namepsaces
  admin: allows read/write access to most resources in a namespace, including the ability to create roles and rolebindings within the namespace. It does not allow write access to resource quota or to the namespace itself.
  edit: Allows read/write access to most objects in a namespace. It does not allow viewing or modifying roles or rolebindings
  view: Allows read-only access to see most objects in a namespace. It does not allow viewing roles or rolebindings. It does not allow viewing secrets, since those are escalating

Darle permisos máximos al usuario adrian:
kubectl create clusterrolebinding admin-adrian --clusterrole=cluster-admin --user=adrian

Si queremos asignar un rol, o clusterrol, para un determinado namespace usaremos:
kubectl create rolebinding NOMBRE --role|--clusterrole NOMBRE --user NOMBRE

Si nos equivocamos al poner el nombre del rol no habrá ningún error.


## Comprobar permisos
Podemos usar este comando para comprobar si un usuario tiene determinados permisos:
kubectl auth can-i list pods --namespace engineering --as bob

Ver todo lo que podemos hacer:
kubectl auth can-i --list
  selfsubjectaccessreviews.authorization.k8s.io y selfsubjectrulesreviews.authorization.k8s.io es para poder ver lo que podemos hacer (el comando de arriba) (el comando de arriba)



# User admin perdido
Obtener el cert de admin de nuevo, desde un nodo master del cluster:
kubeadm alpha kubeconfig user --client-name admin

Luego tendremos que darle los permisos
