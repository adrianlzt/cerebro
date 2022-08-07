Affinity: reglas que atraen a pods a ciertos nodos
Taints: reglas que repelen a los pods de ciertos nodos
Tolerations: permiten a ciertos pods ejecutarse en nodos de donde han sido repelidos por taints.


Assigning Pods to Nodes
https://kubernetes.io/docs/concepts/configuration/assign-pod-node/

# nodeSelector
https://kubernetes.io/docs/tasks/configure-pod-container/assign-pods-nodes/
```
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  nodeSelector:
    disktype: ssd```

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

Poner un taint a un nodo:
kubectl taint nodes node1 key1=value1:NoSchedule

Quitar ese taint:
kubectl taint nodes node1 key1=value1:NoSchedule-

Formato:
kubectl taint NODE NAME KEY_1=VAL_1:TAINT_EFFECT_1 ... KEY_N=VAL_N:TAINT_EFFECT_N

The effect must be NoSchedule, PreferNoSchedule or NoExecute.



Taint configurado por kubespray para los servidores que son "master" pero no "nodes".
node-role.kubernetes.io/master:NoSchedule

En formato YAML
taints:
- effect: NoSchedule
  key: node-role.kubernetes.io/master

Ciertos pods del namespace kube-system se desplegarán de todas maneras:
  calico (red)
  kube-apiserver
  kube-controller-manager
  kube-proxy
  nodelocaldns

Ejemplo de toleration:
tolerations:
- key: "node-role.kubernetes.io/master"
  operator: "Equal"
  effect: "NoSchedule"

Plantilla para meter tolerations:
tolerations:
  - key: "NOMBRE_KEY"
    operator: "Equal|Exists"
    value: "VALOR_KEY"
    effect: "NoSchedule|PreferNoSchedule|NoExecute(1.6 only)"
