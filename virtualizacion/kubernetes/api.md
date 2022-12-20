https://kubernetes.io/docs/reference/access-authn-authz/controlling-access/

Podemos acceder con service accounts o users accounts.

Para poder acceder tenemos que pasar:
1- authentication
2- authorization
3- admission control


# Authentication
https://kubernetes.io/docs/reference/access-authn-authz/authentication/

client certificates
bearer tokens
authenticating proxy
HTTP basic auth



# RAW
Obtener el resultado de llamada a la api en crudo
Mirar kubectl


# curl
https://kubernetes.io/docs/tasks/administer-cluster/access-cluster-api/#without-kubectl-proxy

También podemos usar algún token que tenga el pod montado:
/var/run/secrets/kubernetes.io/serviceaccount/token
