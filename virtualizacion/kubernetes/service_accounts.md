Crear una service account con permisos para acceder a ciertos recursos via token.
La ServiceAccount y el Secret pertenecerán a un NS.
Al asignarle un ClusterRole le estaremos dando permisos sobre todos los namespaces

apiVersion: v1
kind: ServiceAccount
metadata:
  name: zabbix
  namespace: foo-test
secrets:
- name: zabbix-secret
---
apiVersion: v1
kind: Secret
metadata:
  name: zabbix-secret
  namespace: foo-test
  annotations:
    kubernetes.io/service-account.name: zabbix
type: kubernetes.io/service-account-token
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: zabbix-role
rules:
- apiGroups: [""]
  resources: ["pods", "nodes", "replicationcontrollers", "events", "limitranges", "services"]
  verbs: ["get", "delete", "list", "patch", "update"]
- apiGroups: ["extensions"]
  resources: ["deployments"]
  verbs: ["get", "list"]

---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: zabbix-role-binding
roleRef:
  kind: ClusterRole
  name: zabbix-role
  apiGroup: rbac.authorization.k8s.io
subjects:
- kind: ServiceAccount
  name: zabbix
  namespace: foo-test


Para lanzar una petición con curl:
TOKEN=$(kubectl view-secret zabbix-secret token)
curl -kv -H 'Authorization: Bearer $TOKEN' https://kubeapi.com/apis/extensions/v1beta1/namespaces/foo-test/pods
