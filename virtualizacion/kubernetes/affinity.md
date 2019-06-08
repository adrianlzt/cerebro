Assigning Pods to Nodes
https://kubernetes.io/docs/concepts/configuration/assign-pod-node/

# nodeSelector


# affinity
Similar a nodeSelector
El "IgnoreDuringExecution" es que si se cambian las labels una vez el pod ya está desplegado, lo ignoramos.
Tenemos "required" (obligado cumplimiento) y "preferred" (se intentará cumplir, pero no es olbigado).

spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/e2e-az-name
            operator: In
            values:
            - e2e-az1
            - e2e-az2
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 1
        preference:
          matchExpressions:
          - key: another-node-label-key
            operator: In
            values:
            - another-node-label-value


## Antiaffinity para evitar dos pods en el mismo nodo
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 1
            podAffinityTerm:
              topologyKey: kubernetes.io/hostname
              labelSelector:
                matchLabels:
                  app: "{{ template "mariadb.name" . }}"
                  release: "{{ .Release.Name }}"


# taint
https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/

taint es lo contrario a affinity. Se rechaza a los pods.

Las "tolerations" se pueden especificar en un pod para poder ser desplegado en un nodo a pesar de tener un taint que hace match.


Taint configurado por kubespray para los servidores que son "master" pero no "nodes".
node-role.kubernetes.io/master:NoSchedule

Ciertos pods del namespace kube-system se desplegarán de todas maneras:
  calico (red)
  kube-apiserver
  kube-controller-manager
  kube-proxy
  nodelocaldns
