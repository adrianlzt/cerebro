Ejemplo cluster role que solo dejar ver pods y hacer port-forward
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: port-forward
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - get
- apiGroups:
  - ""
  resources:
  - pods/portforward
  verbs:
  - create



Ver pods y sus logs
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: view-logs
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - pods/log
  - pods/status
  verbs:
  - get
  - list
  - watch

